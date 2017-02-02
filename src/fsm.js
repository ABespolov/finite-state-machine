class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.historyArr = [];
        this.historyArr[0] = config.initial;
        this.goRedo = false;
        this.historyArr.currStateIndex = 0;
        if (config != null) {
            this.config = config;
            this.state = config.initial;
        } else {
            throw err;
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        for (var key in this.config.states) {
            if(key == state) {
                this.state = key;
                this.historyArr.push(key);
                this.historyArr.currStateIndex++;
                this.goRedo = false;
                return;
            }
        }
        throw err;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var newState = this.config.states[this.state].transitions[event];
        if(newState != null){
            this.state = newState;
            this.historyArr.push(newState);
            this.historyArr.currStateIndex++;
            this.goRedo = false;
        }else{
            throw err;
        }

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
        this.historyArr.push(this.config.initial);
        this.historyArr.currStateIndex++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var statesArr = [];
        if(arguments.length == 0){
            for (var key in this.config.states) {
                statesArr.push(key);
            }
        }else{
            for (var key in this.config.states) {
                var state = this.config.states[key].transitions[event];
                if(state != null){
                    statesArr.push(key);
                }
            }
        }
        return statesArr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.historyArr.currStateIndex >= 1) {
            this.historyArr.currStateIndex--;
            this.state = this.historyArr[this.historyArr.currStateIndex];
            this.goRedo = true;
            return true;
        }else{
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.historyArr[this.historyArr.currStateIndex + 1] != undefined && this.goRedo) {
            this.historyArr.currStateIndex++;
            this.state = this.historyArr[this.historyArr.currStateIndex];
            return true;
        }else{
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.historyArr = [];
        this.historyArr.currStateIndex = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
