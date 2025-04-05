export const updateTrigger = () => {
  ScriptApp.getProjectTriggers().forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  const nextTriggerDate = new Date();
  nextTriggerDate.setHours(nextTriggerDate.getHours() + 1);
  nextTriggerDate.setMinutes(0);
  nextTriggerDate.setSeconds(0);
  Logger.log(`Next trigger date: ${nextTriggerDate}`);

  ScriptApp.newTrigger('main').timeBased().at(nextTriggerDate).create();
};
