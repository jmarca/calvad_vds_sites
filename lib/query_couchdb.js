/*global require */

var viewer = require('couchdb_get_views')
var couch_check = require('couch_check_state')

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

    couch_check({'db':task.statedb
                ,'doc':task.did
                ,'year':task.year
                ,'state':test_state
                }
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


// // pass in year, config_file (optional) in opts object
// function get_vds_need_imputing(opts,cb){
//     var year = +opts.year
//     viewer({'view':'_design/vds/_view/imputed_status'
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


//exports.get_vds_need_imputing=get_vds_need_imputing
//exports.get_vds_need_plotting=get_vds_need_plotting
//exports.get_vds_need_pairing=get_vds_need_pairing

exports.is_not_imputed = is_not_imputed
