export const updateTrigger = () => {
	for (const trigger of ScriptApp.getProjectTriggers()) {
		ScriptApp.deleteTrigger(trigger);
	}

	const nextTriggerDate = new Date();
	nextTriggerDate.setMinutes(nextTriggerDate.getMinutes() + 5);
	nextTriggerDate.setSeconds(0);
	Logger.log(`Next trigger date: ${nextTriggerDate.toString()}`);

	ScriptApp.newTrigger('main').timeBased().at(nextTriggerDate).create();
};
