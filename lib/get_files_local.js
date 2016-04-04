var path = require('path')
var glob = require('glob')

/**
 * get vds files callback
 * @callback getVDSCallback
 * @param {Error} error or null
 * @param {Array[String]} files, an array of filenames
 */


/**
 * get_yearly_vdsfiles_local
 * @param {Object} opts - the options controlling what files to get
 * @param {string} opts.calvad.vdspath - The required path to VDS
 * data.  This is the root path, and each district is a subdirectory
 * below this top level path
 * @param {number} opts.year - The year to get
 * @param {string} opts.district - The disrict to get, in the form
 * "D03" etc.  The .  The convention is that the vds files are
 * arranged by district, and so this is appended to the root of the
 * directory tree given by the opts.calvad.vdspath value.
 * @param {getVDScallback} cb - a callback function that will get the
 * list of filenames
 * @returns {null}
 * @throws {Error} if opts object does not contain
 */
function get_yearly_vdsfiles_local(opts,cb){
    var hwytypes = ['ML|CH']
    if(opts.calvad === undefined || opts.calvad.vdspath === undefined){
        throw new Error('please define calvad:vdspath in the config.json file')
    }
    var pems_root = opts.calvad.vdspath
    var root = path.normalize(pems_root)
    if(opts.year === undefined) throw Error('need year in opts')
    if(opts.district === undefined) throw Error('need district in opts')
    var district = opts.district
    var pattern
    if(opts.rdata){
        pattern = ["**/*["+hwytypes+"]_*df*",opts.year,".*RData"].join('')
    }else{
        pattern = ["**/*["+hwytypes+"]_",opts.year,".txt.*z"].join('')
    }
    if(opts.amelia){
        // looking for 814480_ML_2010.120.imputed.RData
        pattern = ["**/*["+hwytypes+"]_",opts.year,"*imputed.RData"].join('')
    }
    var searchpath = [root,district].join('/')
    console.log(searchpath,pattern)
    glob(pattern,{cwd:searchpath,dot:true},cb);
    return null

}

exports.get_yearly_vdsfiles_local=get_yearly_vdsfiles_local
