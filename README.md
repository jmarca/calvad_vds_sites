# calvad_vds_sites


Code to get lists of vds sites at various stages of the imputation process

I am resisting bloating up impute_missing repo by putting this here.

The goal is to write some small, tested code that loads vds sites.

It should load vds sites that need imputing for a given year

It should load vds sites that need graphics processing for a given
year

It should load up vds sites that need truck imputation

# Installation and Use

This package requires some couchdb views to be installed.  These are
stored in a single json file in `./couchdb_views/view.json` and can be
installed in the couchdb database directly using my library
`couchdb_put_view`.

For example, do

```
npm install jmarca/couchdb_put_view
node node_modules/couchdb_put_view/put_view.js -c myconfig.json -v myview.json
```
