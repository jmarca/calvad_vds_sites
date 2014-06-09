/* global require console process describe it */

var should = require('should')

var get_vds_need_raw_imputing = require('../lib/query_couchdb').get_vds_need_Raw_imputing
var config_okay = require('config_okay')

var path    = require('path')
var rootdir = path.normalize(__dirname)
var config_file = rootdir+'/../test.config.json'
var config={}


describe('get sites',function(){
    it('should get all the vds sites that need imputing',function(done){
        get_vds_need_raw_imputing({'year':2007
                                  ,'config_file':config_file}
                                 ,function(e,r){
                                      should.not.exist(e)
                                      should.exist(r)
                                      r.should.have.property('rows').with.lengthOf(4000)
                                      return done()
                                  })
    })
})
