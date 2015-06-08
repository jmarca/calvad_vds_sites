/*global require */

var viewer = require('couchdb_get_views')
var couch_check = require('couch_check_state')

function set_couchdb_options(opts){
    var o = {}
    if(opts.config_file !== undefined){
        o.config_file = opts.config_file
        return o
    }
    if(opts.couchdb !== undefined){
        Object.keys(opts.couchdb).forEach(function(k){
            o[k] = opts.couchdb[k]
        })
        return o
    }
    return o
}

var test_state = process.env.CALVAD_VDS_IMPUTED_STATE ||'vdsraw_chain_lengths'
function is_not_imputed(task,cb){
    // check couchdb directly to see if the vdsid/year has already
    // been imputed

    // relies on expectation that the imputation code has done certain
    // things in the db to mark its passing.  Specifically, I'm
    // looking for vdsraw_chain_lengths and if that isn't part of the
    // document then I'm asuming imputation hasn't been run yet

    // if the vdsid/year is imputed, the callback is called with null
    // if it is not imputed, then the callback is called with the original task.
    var o = set_couchdb_options(task)
    o['doc']=task.did
    o['year']=task.year
    o['state']=test_state

    couch_check(o
               ,function(err,state){
                    if(err) return cb(err)
                    if( !state || !Array.isArray(state) ){
                        // no state, or a state that is not an array
                        // means not done imputing
                        return cb(null,task)
                    }else{
                        return cb()
                    }
                })
    return null
}


// pass in year, config_file in opts object
function get_vds_need_raw_imputing(opts,cb){
    var year = +opts.year
    var o = set_couchdb_options(opts)
    o['view']='_design/vds/_view/raw_imputed_status'
    o['startkey']=[year ]
    o['endkey']=[year+1]
    o['reduce']=false

    viewer(o
          ,function(err,docs){
               if(err) throw new Error(err)
               // I've pulled in all the output here.  only return the
               // list with nothing and unprocessed.  drop all those
               // with finished or problems
               if(docs.rows === undefined || docs.rows.length === 0){
                   return cb(null,docs)
               }
               var return_rows = docs.rows.filter(function(row,i){
                                     // decide based on the keys of row
                                     return (row.key[1]==='unprocessed' ||
                                             row.key[1]==='nothing')
                                 })
               docs.rows = return_rows
               return cb(null,docs)
           })
    return null
}

// pass in year, config_file in opts object
function get_vds_done_raw_imputing(opts,cb){
    var year = +opts.year
    var o = set_couchdb_options(opts)
    o['view']='_design/vds/_view/raw_imputed_status'
    o['startkey']=[year ]
    o['endkey']=[year+1]
    o['reduce']=false
    viewer(o
          ,function(err,docs){
               if(err) throw new Error(err)
               // I've pulled in all the output here.  only return the
               // list with nothing and unprocessed.  drop all those
               // with finished or problems
               if(docs.rows === undefined || docs.rows.length === 0){
                   return cb(null,docs)
               }
               var return_rows = docs.rows.filter(function(row,i){
                                     // decide based on the keys of row
                                     return (row.key[1]==='finished')
                                 })
               docs.rows = return_rows
               return cb(null,docs)
           })
    return null
}

// pass in year, config_file in opts object
function get_vds_status_truckimputation_imputing(opts,cb){
    var year = +opts.year
    var o = set_couchdb_options(opts)
    o['view']='_design/vds/_view/truckimputation_imputed_status'
    o['startkey']=[year ]
    o['endkey']=[year+1]
    o['reduce']=false
    viewer(o
          ,function(err,docs){
               if(err) throw new Error(err)
               return cb(null,docs)
           })
    return null
}

// // pass in year, config_file (optional) in opts object
// function get_vds_need_plotting(opts,cb){
//     var year = +opts.year
//     viewer({'view':'_design/vds/_view/plot_status'
//            ,'startkey':[year,"nothing" ]
//            ,'endkey':[year,"nothing",{}]
//            ,'reduce':false
//            ,'config_file':opts.config_file
//            }
//           ,function(err,docs){
//                if(err) throw new Error('oops')
//                cb(null,docs)
//                return null
//            })
//     return null
// }

// // pass in year, config_file (optional) in opts object
// function get_vds_need_pairing(opts,cb){
//     var year = +opts.year
//     viewer({'view':'_design/vds/_view/pair_check_yr'
//            ,'startkey':[year]
//            ,'endkey':[year,"\ufff0"]
//            ,'reduce':false
//            ,'config_file':opts.config_file
//            }
//           ,function(err,docs){
//                if(err) throw new Error('oops')
//                cb(null,docs)
//                return null
//            })
//     return null
// }


//exports.get_vds_need_plotting=get_vds_need_plotting
//exports.get_vds_need_pairing=get_vds_need_pairing

exports.is_not_imputed = is_not_imputed
exports.get_vds_need_raw_imputing=get_vds_need_raw_imputing
exports.get_vds_done_raw_imputing=get_vds_done_raw_imputing
exports.get_vds_status_truckimputation_imputing = get_vds_status_truckimputation_imputing
