export function updateTrigger(): void {
  for (const trigger of ScriptApp.getProjectTriggers()) {
    ScriptApp.deleteTrigger(trigger)
  }

  const nextTriggerDate = new Date()
  const minutes = (Math.floor(nextTriggerDate.getMinutes() / 5) + 1) * 5
  if (minutes === 60) {
    nextTriggerDate.setHours(nextTriggerDate.getHours() + 1)
    nextTriggerDate.setMinutes(0)
  } else {
    nextTriggerDate.setMinutes(minutes)
  }

  nextTriggerDate.setSeconds(0)
  Logger.log(`Next trigger date: ${nextTriggerDate.toString()}`)

  ScriptApp.newTrigger('main').timeBased().at(nextTriggerDate).create()
}
