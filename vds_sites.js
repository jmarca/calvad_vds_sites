//var get_files = require('./lib/get_files')
var q_c = require('./lib/query_couchdb')
var locals = require('./lib/get_files_local.js')
// exports.get_yearly_vdsfiles=get_files.get_yearly_vdsfiles
//exports.get_yearly_vdsfiles_local=get_files.get_yearly_vdsfiles_local
exports.is_not_imputed = q_c.is_not_imputed
exports.get_vds_need_raw_imputing=q_c.get_vds_need_raw_imputing
exports.get_vds_done_raw_imputing=q_c.get_vds_done_raw_imputing
exports.get_vds_status_truckimputation = q_c.get_vds_status_truckimputation_imputing

exports.get_yearly_vdsfiles_local = locals.get_yearly_vdsfiles_local
