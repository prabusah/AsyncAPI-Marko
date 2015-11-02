/*
NOTE: !!!!!!
Get your api key from https://data.api.gov and replace string <REPLACE YOUR API KEY> with your api key
*/

var template = require('marko').load(require.resolve('./template.marko'));
var https = require('https');

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    var renderMode = req.query.renderMode || 'progressive-out-of-order';
    var jsLocation = req.query.jsLocation || 'middle';
    var reorder = renderMode === 'progressive-out-of-order';
    var stateName = escape(req.body.state);
    var token = req.body.token;
    var auth = 'Bearer '+token;

    var apiOne = {
        host : 'apphonics.tcs.com', 
        port : 443,
        path : '/public/open-government-data/v1.0/?resource_id=5d76aa1c-fd1d-41f1-bc34-25aa6d356402&api-key=<REPLACE YOUR API KEY>&filters[stateu_t_]='+stateName,
        method : 'GET',
        headers : {'Authorization': auth},
        rejectUnauthorized: false
    };

    var apiTwo = {
        host : 'apphonics.tcs.com', 
        port : 443,
        path : '/public/open-government-data/v1.0/?resource_id=3b66700e-3368-4a7f-975f-abfabe861501&api-key=<REPLACE YOUR API KEY>&filters[stateu_t_]='+stateName, 
        method : 'GET',
        headers : {'Authorization': auth},
        rejectUnauthorized: false
    };

    var apiThree = {
        host : 'apphonics.tcs.com', 
        port : 443,
        path : '/public/open-government-data/v1.0/?resource_id=7390abfc-3b3f-4a07-a17d-3cfe2ffa9300&api-key=<REPLACE YOUR API KEY>&filters[statesuts]='+stateName, 
        method : 'GET',
        headers : {'Authorization': auth},
        rejectUnauthorized: false
    };

    var viewModel = {
        headerDataProvider: function(args, callback) {
            var start = new Date();
            reqGet = https.request(apiOne, function(res) {
                var body = '';
                res.on('data', function(d) {
                    body += d;
                });
                res.on('end', function() {
                    var end = (new Date() - start) + 1000; //1s delayed manually
                    var par = JSON.parse(body);
                    //process.stdout.write(parsed.help);
                    
                    if(par.success === true){
                        setTimeout(function() {
                            callback(null, {
                                timetaken : end,
                                State : par.records[0].stateu_t_,
                                fttMale : par.records[0].full_time_teachers___male,
                                fttFemale : par.records[0].full_time_teachers___female,
                                contractMale : par.records[0].paracontract_teachers___male,
                                contractFemale : par.records[0].paracontract_teachers___female
                            });
                        }, 1000);
                    }
                });
            });
            reqGet.end();
            reqGet.on('error', function(e) {
                console.error(e);
            });      
        },
        navDataProvider: function(args, callback) {
            var start = new Date();
            reqGet = https.request(apiTwo, function(res) {
                var body = '';
                res.on('data', function(d) {
                    body += d;
                });
                res.on('end', function() {
                    var end = new Date() - start;
                    var par = JSON.parse(body);
                    if(par.success === true){
                        setTimeout(function() {
                            callback(null, {
                                timeTaken : end,
                                State : par.records[0].stateu_t_,
                                ninethMale : par.records[0].enrolment_in_class_ix___boys,
                                ninethFemale : par.records[0].enrolment_in_class_ix___girls,
                                tenthMale : par.records[0].enrolment_in_class_x___boys,
                                tenthFemale : par.records[0].enrolment_in_class_x___girls
                            });
                        }, 0);
                    }    
                });
            });
            reqGet.end();
            reqGet.on('error', function(e) {
                console.error(e);
            });
        },
        mainDataProvider: function(args, callback) {
            var start = new Date();
            reqGet = https.request(apiThree, function(res) {
                var body = '';
                res.on('data', function(d) {
                    body += d;
                });
                res.on('end', function() {
                    var end = new Date() - start;
                    var par = JSON.parse(body);
                    if(par.success === true) {
                        setTimeout(function() {
                            callback(null, {
                                timeTaken : end,
                                State : par.records[0].statesuts,
                                electrified : par.records[0].villages_electrified_as_on_31_03_2014_provisionalnumbers,
                                unelectrified : par.records[0].unelectrified_villages_as_on_28_02_2015
                            });
                        }, 0);
                    }    
                });
            });
            reqGet.end();
            reqGet.on('error', function(e) {
                console.error(e);
            });
        },
        footerDataProvider: function(args, callback) {
            setTimeout(callback, args.delay);
        },
        renderMode: renderMode,
        reorderEnabled: reorder,
        jsLocation: jsLocation
    };

    if (renderMode === 'single-chunk') {
        template.render(viewModel, function(err, html) {
            if (err) {
                res.end(err.toString());
                return;
            }
            res.end(html);
        });
    } else {
        template.render(viewModel, res);
    }

}