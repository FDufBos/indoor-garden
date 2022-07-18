# **Indoor Garden** 🌱
An app to help you keep track of your indoor plants
<br><br>

## **Features**

* Save and access your garden across devices by making an account
* Keep track of your plants with counters
  * How long until you need to water
  * Streak of how many days you've meet watering schedule
  <br><br>
## **To do**

* <input type="checkbox" disabled>🐛 First time someone clicks a plant to see plant page after logging in it returns undefined instead of the plant
<br/><br/>
* <input type="checkbox" disabled>🚨 Reduce the number of times Firestore is called
  * Put objects in state instead of calling directly
  <br/><br/>
* <input type="checkbox" disabled>🚨 Reduce the number of times Auth is called
  * Put objects in state instead of calling directly
  <br/><br/>
* <input type="checkbox" disabled>✨ Create counters
  * <input type="checkbox" disabled>💧 Time until next water 
    * (DaysBetweenWatering-DaysSinceLastWatered)
    * (DaysSinceLastWatered = (Today-LastWateredDate))
  * <input type="checkbox" disabled>🔥 Watering streak
    * 
<br/><br/>
* <input type="checkbox" disabled> 🗃️ Create database of plants people can add with their info
<br/><br/>
* 🙊 Give plants personality
  * <input type="checkbox" disabled> 🗃️ Create database of personalities and things they say
<br/><br/>
* <input type="checkbox" disabled> ✨ Create User Profile Page
