/* global require console process describe it */

var should = require('should')

var q_c = require('../lib/query_couchdb')
var get_vds_need_raw_imputing = q_c.get_vds_need_raw_imputing
var get_vds_done_raw_imputing = q_c.get_vds_done_raw_imputing
var config_okay = require('config_okay')

var path    = require('path')
var rootdir = path.normalize(__dirname)
var config_file = rootdir+'/../test.config.json'
var config={}


describe('get sites',function(){
    it('should get all the vds sites that need imputing',function(done){
        get_vds_need_raw_imputing({'year':2010
                                  ,'config_file':config_file}
                                 ,function(e,r){
                                      should.not.exist(e)
                                      should.exist(r)
                                      r.should.have.property('rows').with.lengthOf(8)
                                      return done()
                                  })
    })
    it('should get all the vds sites that need imputing',function(done){
        get_vds_need_raw_imputing({'year':2014
                                  ,'config_file':config_file}
                                 ,function(e,r){
                                      should.not.exist(e)
                                      should.exist(r)
                                      r.should.have.property('rows').with.lengthOf(519)
                                      return done()
                                  })
    })
    it('should get all the vds sites that need imputing',function(done){
        get_vds_done_raw_imputing({'year':2010
                                  ,'config_file':config_file}
                                 ,function(e,r){
                                      should.not.exist(e)
                                      should.exist(r)
                                      r.should.have.property('rows').with.lengthOf(494)
                                      return done()
                                  })
    })
    it('should get all the vds sites that need imputing',function(done){
        get_vds_done_raw_imputing({'year':2014
                                  ,'config_file':config_file}
                                 ,function(e,r){
                                      should.not.exist(e)
                                      should.exist(r)
                                      r.should.have.property('rows').with.lengthOf(0)
                                      return done()
                                  })
    })
})