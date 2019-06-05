export function setStateValues(e, context){

    let field   = e.target.name;
    let value   = e.target.value;
    let update  = {};
    
    update[field] = value;
    
    context.setState(
        update
    )

}

export function sleep(ms=1500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}