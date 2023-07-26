const events = require('events');

module.exports = class extends events.EventEmitter{
    constructor(){
        //'super' it will call contructor of base class which is 'EventEmitter' class.
        super();
    }
}