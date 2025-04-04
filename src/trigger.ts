export const updateTrigger = () => {
  ScriptApp.getProjectTriggers().forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  // Set the next trigger to run in 1 hour
  const nextTriggerDate = new Date();
  nextTriggerDate.setHours(nextTriggerDate.getHours() + 1);
  nextTriggerDate.setMinutes(0);
  nextTriggerDate.setSeconds(0);
  Logger.log(`Next trigger date: ${nextTriggerDate}`);

  // Create a new time-based trigger for `main` function
  ScriptApp.newTrigger('main').timeBased().at(nextTriggerDate).create();
};
