System.register([], function(exports_1, context_1) {
    /**
     * Created by Umar on 20/02/2017.
     */
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var socket_src;
    return {
        setters:[],
        execute: function() {
            //export var socket_src: string ='http://ec2-52-56-141-53.eu-west-2.compute.amazonaws.com:8000';
            exports_1("socket_src", socket_src = 'http://localhost:8000');
        }
    }
});
//# sourceMappingURL=configer.js.map