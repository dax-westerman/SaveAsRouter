const actionInstanceCache = {};

export async function handleTag(tag) {
    // Your logic here
    alert('Received tag: ' + tag);

    let instance;

    if (tag in actionInstanceCache) {
        instance = actionInstanceCache[tag];
        console.log(`Using cached action for tag: ${tag}`);
    } else {
        const module = await import(`./${tag}/action.js`);
        const ActionClass = module.default;
        instance = new ActionClass();
        actionInstanceCache[tag] = instance;
        console.log(`Creating new instance for: ${tag}`);
    }


    console.log(`Loaded action for tag: ${instance.actionType}`);



    return tag;
}