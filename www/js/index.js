/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var currentTime = 0;
var affprep = 240;
var negprep = 240;
var prepa = false;
var prepn = false;
var interval;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
FastClick.attach(document.body);

$(document).ready(function(){
    $("#AC").click(function(){
        prepn = false;
        prepa = false;
        clearInterval(interval);
        setTime('360');
    });
    $("#1AR").click(function(){
        prepn = false;
        prepa = false;
        clearInterval(interval);
        setTime('240');
    });
    $("#2AR").click(function(){
        prepn = false;
        prepa = false;
        clearInterval(interval);
        setTime('180');
    });
    $("#CX").click(function(){
        prepn = false;
        prepa = false;
        clearInterval(interval);
        setTime('180');
    });
    $("#NC").click(function(){
        prepn = false;
        prepa = false;
        clearInterval(interval);
        setTime('420');
    });
    $("#2NR").click(function(){
        prepn = false;
        prepa = false;
        clearInterval(interval);
        setTime('360');
    });
    $("#STOP").click(function(){
        clearInterval(interval);
    });
    $("#START").click(function(){
        startInterval();
    });
    $("#APREP").click(function(){
        prepn = false;
        prepa = true;
        clearInterval(interval);
        setAffPrepTime(affprep);
    });
    $("#NPREP").click(function(){
        prepn = true;
        prepa = false;
        clearInterval(interval);
        setNegPrepTime(negprep);
    });
});

function setAffPrepTime(t) {
    $("#timer").text(secondsTimeSpanToHMS(t));
    $("#APREP").text("AFF PREP (" + secondsTimeSpanToHMS(t) + ")")
    currentTime = t;
    affprep = t;
}

function setNegPrepTime(t) {
    $("#timer").text(secondsTimeSpanToHMS(t));
    $("#NPREP").text("NEG PREP (" + secondsTimeSpanToHMS(t) + ")")
    currentTime = t;
    negprep = t;
}

function aprepInterval() {
    clearInterval(interval);
    prepn = false;
    prepa = true;
    interval = setInterval(function() {
        if (affprep != 0) {
            affprep--;
            setAffPrepTime(affprep);
        } else {
            clearInterval(interval);
        }
    }, 1000);
}

function nprepInterval() {
    clearInterval(interval);
    prepn = true;
    prepa = false;
    interval = setInterval(function() {
        if (negprep != 0) {
            negprep--;
            setNegPrepTime(negprep);
        } else {
            clearInterval(interval);
        }
    }, 1000);
}

function startInterval() {
    if(prepn == true) {
        nprepInterval();
    } else if(prepa == true) {
        aprepInterval();
    } else {
        clearInterval(interval);
        interval = setInterval(function() {
            if (currentTime != 0) {
                currentTime--;
                setTime(currentTime);
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }
}

function setTime(t) {
    $("#timer").text(secondsTimeSpanToHMS(t));
    currentTime = t;
}

function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return m+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}