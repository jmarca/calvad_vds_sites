/* global require console process describe it */
var get_files = require('../.').get_yearly_vdsfiles_local

var should = require('should')
var path    = require('path')
var rootdir = path.normalize(__dirname)


var config_file = rootdir+'/../test.config.json'
var config={}
var config_okay = require('config_okay')
before(function(done){

    config_okay(config_file,function(err,c){
        if(err){
            throw new Error('node.js needs a good croak module')
        }
        config = c
        return done()
    })
    return null
})



describe('get vds files local',function(){
    it('should throw an error if vdspath is not defined'
       ,function(){
           var options = {'district':'D05'
                          ,'year':2012};
           // not setting calvad options here

           (function(){
               get_files(options
                      ,function(err,list){
                      })
           }).should.throw()

       })
    it('should get txt files in 2012, D05'
       ,function(done){
           var yr = 2012
           var options = {'district':'D05'
                          ,'year':yr
                         }
           options.calvad = config.calvad;

           get_files(options
                     ,function(err,list){
                         should.not.exist(err)
                         //console.log(list)
                         list.should.have.property('length',9)
                         list.forEach(function(f){
                             f.should.match(/\.txt\.?.z$/);
                             return null
                         })
                         return done()
                     })
           return null
       })
    it('should get rdata files in 2012, D05'
       ,function(done){
           var yr = 2012
           var options = {'district':'D05'
                          ,'year':yr
                          ,'rdata':1}
           options.calvad = config.calvad
           get_files(options
                     ,function(err,list){
                         should.not.exist(err)
                         //console.log(list)
                         list.should.have.property('length',9)
                         list.forEach(function(f){
                             f.should.match(new RegExp(yr+'.*\.RData$'));
                             return null
                         })
                         return done()
                     })
           return null
       })
    it('should get amelia files in 2012, D05'
       ,function(done){
           var yr = 2012
           var options = {'district':'D05'
                          ,'year':yr
                          ,'amelia':1}
           options.calvad = config.calvad
           get_files(options
                      ,function(err,list){
                          should.not.exist(err)
                          //console.log(list)
                          list.should.have.property('length',9)
                          list.forEach(function(f){
                              f.should.match(new RegExp(yr+'.*\.RData$'));
                              return null
                          })
                          return done()
                      })
           return null
       })
})
