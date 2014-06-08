/* global require console process describe it */

// test that I can check for imputed, not imputed

var should = require('should')
var queue = require("queue-async")

var is_not_imputed = require('../lib/query_couchdb').is_not_imputed
var config_okay = require('config_okay')

var path    = require('path')
var rootdir = path.normalize(__dirname)
var config_file = rootdir+'/../test.config.json'
var config={}


describe('is_not_imputed',function(){
    it('should return null for a detector that *is* imputed'
      ,function(done){
           var task = {'district':'D03'
                      ,'year':2010
                      ,'did':313166
                      }
           config_okay(config_file,function(err,c){
               if(!c.couchdb.db){ throw new Error('need valid db defined in test.config.json')}
               task.config = c
               task.statedb = c.couchdb.db
               is_not_imputed(task,function(e,r){
                   should.not.exist(e)
                   should.not.exist(r)
                   return done()
               })
           })
       })
    it('should return null for a detector that is imputed even if it had problems'
      ,function(done){
           var task = {'district':'D07'
                      ,'year':2010
                      ,'did':717264
                      }
           config_okay(config_file,function(err,c){
               if(!c.couchdb.db){ throw new Error('need valid db defined in test.config.json')}
               task.config = c
               task.statedb = c.couchdb.db
               is_not_imputed(task,function(e,r){
                   should.not.exist(e)
                   should.not.exist(r)
                   return done()
               })
           })
       })

    it('should return the task for a detector that is not processed'
      ,function(done){
           var task = {'district':'D07'
                      ,'year':2010
                      ,'did':1115749
                      }
           config_okay(config_file,function(err,c){
               if(!c.couchdb.db){ throw new Error('need valid db defined in test.config.json')}
               task.config = c
               task.statedb = c.couchdb.db
               is_not_imputed(task,function(e,r){
                   should.not.exist(e)
                   should.not.exist(r)
                   return done()
               })
           })
       })

})
