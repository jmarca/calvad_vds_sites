// test the db path

/* global require console process describe it */

var should = require('should')

var async = require('async')
var _ = require('lodash')
var superagent = require('superagent')
var http = require('http')

var get_files = require('../lib/get_files')

//describe('remote files unused right now')
// describe('get vds files',function(){
//     it('should get txt files in 2007, D05'
//       ,function(done){
//            get_files.get_yearly_vdsfiles({'district':'D05'
//                                          ,'year':2007}
//                                         ,function(err,list){
//                                              should.not.exist(err)
//                                              //console.log(list)
//                                              list.should.have.property('length',10)
//                                              _.each(list
//                                                    ,function(f){
//                                                         f.should.match(/\.txt\..z$/);
//                                                     })
//                                              return done()
//                                          })
//        })
//     it('should get rdata files in 2007, D05'
//       ,function(done){
//            var yr = 2007
//            get_files.get_yearly_vdsfiles({'district':'D05'
//                                          ,'year':yr
//                                          ,'rdata':1}
//                                         ,function(err,list){
//                                              should.not.exist(err)
//                                              //console.log(list)
//                                              list.should.have.property('length',10)
//                                              _.each(list
//                                                    ,function(f){
//                                                         f.should.match(new RegExp(yr+'RData$'));
//                                                     })
//                                              return done()
//                                          })
//        })
//     it('should get amelia files in 2007, D05'
//       ,function(done){
//            var yr = 2007
//            get_files.get_yearly_vdsfiles({'district':'D03'
//                                          ,'year':yr
//                                          ,'amelia':1}
//                                         ,function(err,list){
//                                              should.not.exist(err)
//                                              //console.log(list)
//                                              list.should.have.property('length',314)
//                                              _.each(list
//                                                    ,function(f){
//                                                         f.should.match(new RegExp(yr+'RData$'));
//                                                     })
//                                              return done()
//                                          })
//        })
// })
