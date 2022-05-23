import React from 'react'
import { useState } from 'react'
import hoursService from '../services/hours'

// ------------------------------------------------------------------------------------------------------------------------------
// How to update state in a nested object in React with Hooks
// https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/
// ------------------------------------------------------------------------------------------------------------------------------

const TimeCard = ({ user, setErrorMessage }) => {
    const [screen, setScreen] = useState('1')
    const [hours, setHours] = useState(null)

    const loading = () => {
        if (user === null) {
            return 'Loading...'
        } else {
            // name displayed in header
            // return user.username[0].toUpperCase() + user.username.slice(1).toLowerCase()
        }
    }

    const ScreenOne = ({ user }) => {
        return (
            <div>                
                <h1>{ loading() }</h1>
                <br/>
                <button onClick={() => toScreen('3')} >New time card</button>
                <ul>
                    {
                        user &&
                        user.hours.map(
                            hours =>
                            <li key={hours.id}>
                                <button onClick={() => handleGetHours(hours)}>
                                    <b>Period: {hours.month}</b>
                                    <b>Last update: {hours.date}</b>
                                </button>
                            </li>
                        )
                    }
                </ul>                
            </div>            
        )
    }
        
    const ScreenTwo = ({ hours }) => {
        return (
          <div>
              <h1>{ hours.month.toUpperCase()}</h1>
              <button onClick={() => toScreen('1')} >Back</button>
              <ul>
                  {
                      hours &&
                      hours.days.map(
                          day =>
                          <li key={day.dayNumber}>
                              <p>Day: {day.dayNumber} Job description: {day.jobDescription} Start: {day.startWork}, End: {day.endWork}</p>
                              <p>Total Hours: {hours.totalHours}</p>
                          </li>
                      )
                  }
              </ul>
              <p>Month total Hours: {hours.monthHours}</p>
              <p>Last update: { hours.date }</p>
          </div>
        )
    }
      
    const ScreenThree = () => {
        
        // set timecard template
        const hours = {
            month: '',
            days:[],
            monthHours:'',    
        }
        const days = []
        
        // set days
        for (let index = 0; index < 31; index++) {
            if (index < 11) {
                // hours.days.push({
                    days.push({
                    dayNumber: index + 21,  // day start from 21 'couse index is 0. once index is 10 day is 31
                    jobDescription: '',
                    startWork: '00:00',
                    endWork: '00:00',
                    totalHours: '',
                })    
            } else {
                // hours.days.push({
                    days.push({
                    dayNumber: index - 10,  // once index is 11 substract 10 to start from this point with day 1
                    jobDescription: '',
                    startWork: '00:00',
                    endWork: '00:00',
                    totalHours: '',
                })
            }
        }

        hours.days = days
        
        const [inputs, setInputs] = useState({})        
        const [start, setStart] = useState({})
        const [end, setEnd] = useState({})
        const [description, setDescription] = useState({})
        
        const timeToDecimal = (t) => {
            var arr = t.split(':')
            var dec = parseInt((arr[1]/6)*10, 10)
        
            return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec)
        }

        // fix trailing digits
        const calculate = (startTime, endTime) => {
            let start = startTime
            let end = endTime
            let normal = 0
            let special = 0
            if (end < 4) {
                end += 24
            }
            const total = end - start
            
            if (end > 18) {
                special = end - 18
                normal = 18 - start
            }else {
                normal = total
            }

            // setInputs(values => ({...values, total: total, normal: normal, special: special}))
            // console.log('normal', normal, 'special', special)

            return {
                normal: normal,
                special: special,
                total: total
            }
        }

        const handleChange = (event) => {

            const name = event.target.name
            const value = event.target.value
            setInputs(values => ({...values,
                [name]: value,
            }))

            setStart(values => ({...values,
                [name]: value,
            }))

            setEnd(values => ({...values,
                [name]: value,
            }))

            setDescription(values => ({...values,
                [name]: value,
            }))
        }

        const addTimeCard = async (event) => {
            event.preventDefault()
            const {month} = inputs
            if (!month) {
                return console.log('Month is a required field')
            }

            const {
                startWork0,
                startWork1,
                startWork2,
                startWork3,
                startWork4,
                startWork5,
                startWork6,
                startWork7,
                startWork8,
                startWork9,
                startWork10,
                startWork11,
                startWork12,
                startWork13,
                startWork14,
                startWork15,
                startWork16,
                startWork17,
                startWork18,
                startWork19,
                startWork20,
                startWork21,
                startWork22,
                startWork23,
                startWork24,
                startWork25,
                startWork26,
                startWork27,
                startWork28,
                startWork29,
                startWork30,
                
            } = start

            const {
                endWork0,
                endWork1,
                endWork2,
                endWork3,
                endWork4,
                endWork5,
                endWork6,
                endWork7,
                endWork8,
                endWork9,
                endWork10,
                endWork11,
                endWork12,
                endWork13,
                endWork14,
                endWork15,
                endWork16,
                endWork17,
                endWork18,
                endWork19,
                endWork20,
                endWork21,
                endWork22,
                endWork23,
                endWork24,
                endWork25,
                endWork26,
                endWork27,
                endWork28,
                endWork29,
                endWork30,
                
            } = end

            const {
                jobDescription0,
                jobDescription1,
                jobDescription2,
                jobDescription3,
                jobDescription4,
                jobDescription5,
                jobDescription6,
                jobDescription7,
                jobDescription8,
                jobDescription9,
                jobDescription10,
                jobDescription11,
                jobDescription12,
                jobDescription13,
                jobDescription14,
                jobDescription15,
                jobDescription16,
                jobDescription17,
                jobDescription18,
                jobDescription19,
                jobDescription20,
                jobDescription21,
                jobDescription22,
                jobDescription23,
                jobDescription24,
                jobDescription25,
                jobDescription26,
                jobDescription27,
                jobDescription28,
                jobDescription29,
                jobDescription30,
                
            } = description
            
            hours.days[0].startWork = startWork0
            hours.days[1].startWork = startWork1
            hours.days[2].startWork = startWork2
            hours.days[3].startWork = startWork3
            hours.days[4].startWork = startWork4
            hours.days[5].startWork = startWork5
            hours.days[6].startWork = startWork6
            hours.days[7].startWork = startWork7
            hours.days[8].startWork = startWork8
            hours.days[9].startWork = startWork9
            hours.days[10].startWork = startWork10
            hours.days[11].startWork = startWork11
            hours.days[12].startWork = startWork12
            hours.days[13].startWork = startWork13
            hours.days[14].startWork = startWork14
            hours.days[15].startWork = startWork15
            hours.days[16].startWork = startWork16
            hours.days[17].startWork = startWork17
            hours.days[18].startWork = startWork18
            hours.days[19].startWork = startWork19
            hours.days[20].startWork = startWork20
            hours.days[21].startWork = startWork21
            hours.days[22].startWork = startWork22
            hours.days[23].startWork = startWork23
            hours.days[24].startWork = startWork24
            hours.days[25].startWork = startWork25
            hours.days[26].startWork = startWork26
            hours.days[27].startWork = startWork27
            hours.days[28].startWork = startWork28
            hours.days[29].startWork = startWork29
            hours.days[30].startWork = startWork30
            
            hours.days[0].endWork = endWork0
            hours.days[1].endWork = endWork1
            hours.days[2].endWork = endWork2
            hours.days[3].endWork = endWork3
            hours.days[4].endWork = endWork4
            hours.days[5].endWork = endWork5
            hours.days[6].endWork = endWork6
            hours.days[7].endWork = endWork7
            hours.days[8].endWork = endWork8
            hours.days[9].endWork = endWork9
            hours.days[10].endWork = endWork10
            hours.days[11].endWork = endWork11
            hours.days[12].endWork = endWork12
            hours.days[13].endWork = endWork13
            hours.days[14].endWork = endWork14
            hours.days[15].endWork = endWork15
            hours.days[16].endWork = endWork16
            hours.days[17].endWork = endWork17
            hours.days[18].endWork = endWork18
            hours.days[19].endWork = endWork19
            hours.days[20].endWork = endWork20
            hours.days[21].endWork = endWork21
            hours.days[22].endWork = endWork22
            hours.days[23].endWork = endWork23
            hours.days[24].endWork = endWork24
            hours.days[25].endWork = endWork25
            hours.days[26].endWork = endWork26
            hours.days[27].endWork = endWork27
            hours.days[28].endWork = endWork28
            hours.days[29].endWork = endWork29
            hours.days[30].endWork = endWork30
            
            hours.days[0].jobDescription = jobDescription0
            hours.days[1].jobDescription = jobDescription1
            hours.days[2].jobDescription = jobDescription2
            hours.days[3].jobDescription = jobDescription3
            hours.days[4].jobDescription = jobDescription4
            hours.days[5].jobDescription = jobDescription5
            hours.days[6].jobDescription = jobDescription6
            hours.days[7].jobDescription = jobDescription7
            hours.days[8].jobDescription = jobDescription8
            hours.days[9].jobDescription = jobDescription9
            hours.days[10].jobDescription = jobDescription10
            hours.days[11].jobDescription = jobDescription11
            hours.days[12].jobDescription = jobDescription12
            hours.days[13].jobDescription = jobDescription13
            hours.days[14].jobDescription = jobDescription14
            hours.days[15].jobDescription = jobDescription15
            hours.days[16].jobDescription = jobDescription16
            hours.days[17].jobDescription = jobDescription17
            hours.days[18].jobDescription = jobDescription18
            hours.days[19].jobDescription = jobDescription19
            hours.days[20].jobDescription = jobDescription20
            hours.days[21].jobDescription = jobDescription21
            hours.days[22].jobDescription = jobDescription22
            hours.days[23].jobDescription = jobDescription23
            hours.days[24].jobDescription = jobDescription24
            hours.days[25].jobDescription = jobDescription25
            hours.days[26].jobDescription = jobDescription26
            hours.days[27].jobDescription = jobDescription27
            hours.days[28].jobDescription = jobDescription28
            hours.days[29].jobDescription = jobDescription29
            hours.days[30].jobDescription = jobDescription30

            

            hours.month = inputs.month            
            
            await hoursService
              .create(hours)
            console.log(inputs)
              setErrorMessage('Time card created')
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
          }        

        return (
            <div>
                <h1>TIMESEDDEL / TIME CARD</h1>
                <br/>
                <button onClick={() => toScreen('1')} >Back</button>
                <br/>

                {/* https://www.w3schools.com/react/react_forms.asp */}

                {/* When the data is handled by the components, all the data is stored in the component state. */}

                {/* You can control changes by adding event handlers in the onChange attribute. */}

                {/* You can control the submit action by adding an event handler in the onSubmit attribute for the <form>: */}

                {/* You can control the values of more than one input field by adding a name attribute to each element.

                We will initialize our state with an empty object.

                To access the fields in the event handler use the event.target.name and event.target.value syntax.

                To update the state, use square brackets [bracket notation] around the property name. */}
                
                <form onSubmit={addTimeCard}>
                <p>MONTH/MÅNED</p>
                <input
                    type="text"
                    name="month"
                    value={inputs.month || ''}
                    onChange={handleChange}
                />
                    <div className='timecard'>
                        
                            <div className='timeCardHeader'>
                                <p className='left'>DATO / DATE</p>
                                <p className='left'>JOB DESCRIPTION</p>
                                <p className='left'>START: TIME</p>
                                <p className='left'>FINISH: TIME</p>
                                <p className='left'>TOTAL HOURS/TIMER</p>
                            </div>

                            <div className='eachDay'>
                                <p>{days[0].dayNumber}</p>

                                <input 
                                    id='0'
                                    type="text"
                                    name="jobDescription0"
                                    value={description.jobDescription0 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='0'
                                    type="time"
                                    name="startWork0"
                                    value={start.startWork0 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='0'
                                    type="time"
                                    name="endWork0"
                                    value={end.endWork0 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[1].dayNumber}</p>

                                <input 
                                    id='1'
                                    type="text"
                                    name="jobDescription1"
                                    value={description.jobDescription1 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='1'
                                    type="time"
                                    name="startWork1"
                                    value={start.startWork1 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='1'
                                    type="time"
                                    name="endWork1"
                                    value={end.endWork1 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[2].dayNumber}</p>

                                <input 
                                    id='2'
                                    type="text"
                                    name="jobDescription2"
                                    value={description.jobDescription2 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='2'
                                    type="time"
                                    name="startWork2"
                                    value={start.startWork2 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='2'
                                    type="time"
                                    name="endWork2"
                                    value={end.endWork2 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[3].dayNumber}</p>

                                <input 
                                    id='3'
                                    type="text"
                                    name="jobDescription3"
                                    value={description.jobDescription3 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='3'
                                    type="time"
                                    name="startWork3"
                                    value={start.startWork3 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='3'
                                    type="time"
                                    name="endWork3"
                                    value={end.endWork3 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[4].dayNumber}</p>

                                <input 
                                    id='4'
                                    type="text"
                                    name="jobDescription4"
                                    value={description.jobDescription4 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='4'
                                    type="time"
                                    name="startWork4"
                                    value={start.startWork4 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='4'
                                    type="time"
                                    name="endWork4"
                                    value={end.endWork4 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[5].dayNumber}</p>

                                <input 
                                    id='5'
                                    type="text"
                                    name="jobDescription5"
                                    value={description.jobDescription5 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='5'
                                    type="time"
                                    name="startWork5"
                                    value={start.startWork5 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='5'
                                    type="time"
                                    name="endWork5"
                                    value={end.endWork5 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[6].dayNumber}</p>

                                <input 
                                    id='6'
                                    type="text"
                                    name="jobDescription6"
                                    value={description.jobDescription6 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='6'
                                    type="time"
                                    name="startWork6"
                                    value={start.startWork6 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='6'
                                    type="time"
                                    name="endWork6"
                                    value={end.endWork6 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[7].dayNumber}</p>

                                <input 
                                    id='7'
                                    type="text"
                                    name="jobDescription7"
                                    value={description.jobDescription7 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='7'
                                    type="time"
                                    name="startWork7"
                                    value={start.startWork7 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='7'
                                    type="time"
                                    name="endWork7"
                                    value={end.endWork7 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[8].dayNumber}</p>

                                <input 
                                    id='8'
                                    type="text"
                                    name="jobDescription8"
                                    value={description.jobDescription8 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='8'
                                    type="time"
                                    name="startWork8"
                                    value={start.startWork8 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='8'
                                    type="time"
                                    name="endWork8"
                                    value={end.endWork8 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[9].dayNumber}</p>

                                <input 
                                    id='9'
                                    type="text"
                                    name="jobDescription9"
                                    value={description.jobDescription9 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='9'
                                    type="time"
                                    name="startWork9"
                                    value={start.startWork9 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='9'
                                    type="time"
                                    name="endWork9"
                                    value={end.endWork9 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[10].dayNumber}</p>

                                <input 
                                    id='10'
                                    type="text"
                                    name="jobDescription10"
                                    value={description.jobDescription10 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='10'
                                    type="time"
                                    name="startWork10"
                                    value={start.startWork10 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='10'
                                    type="time"
                                    name="endWork10"
                                    value={end.endWork10 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[11].dayNumber}</p>

                                <input 
                                    id='11'
                                    type="text"
                                    name="jobDescription11"
                                    value={description.jobDescription11 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='11'
                                    type="time"
                                    name="startWork11"
                                    value={start.startWork11 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='11'
                                    type="time"
                                    name="endWork11"
                                    value={end.endWork11 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[12].dayNumber}</p>

                                <input 
                                    id='12'
                                    type="text"
                                    name="jobDescription12"
                                    value={description.jobDescription12 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='12'
                                    type="time"
                                    name="startWork12"
                                    value={start.startWork12 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='12'
                                    type="time"
                                    name="endWork12"
                                    value={end.endWork12 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[13].dayNumber}</p>

                                <input 
                                    id='13'
                                    type="text"
                                    name="jobDescription13"
                                    value={description.jobDescription13 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='13'
                                    type="time"
                                    name="startWork13"
                                    value={start.startWork13 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='13'
                                    type="time"
                                    name="endWork13"
                                    value={end.endWork13 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[14].dayNumber}</p>

                                <input 
                                    id='14'
                                    type="text"
                                    name="jobDescription14"
                                    value={description.jobDescription14 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='14'
                                    type="time"
                                    name="startWork14"
                                    value={start.startWork14 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='14'
                                    type="time"
                                    name="endWork14"
                                    value={end.endWork14 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[15].dayNumber}</p>

                                <input 
                                    id='15'
                                    type="text"
                                    name="jobDescription15"
                                    value={description.jobDescription15 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='15'
                                    type="time"
                                    name="startWork15"
                                    value={start.startWork15 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='15'
                                    type="time"
                                    name="endWork15"
                                    value={end.endWork15 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[16].dayNumber}</p>

                                <input 
                                    id='16'
                                    type="text"
                                    name="jobDescription16"
                                    value={description.jobDescription16 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='16'
                                    type="time"
                                    name="startWork16"
                                    value={start.startWork16 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='16'
                                    type="time"
                                    name="endWork16"
                                    value={end.endWork16 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[17].dayNumber}</p>

                                <input 
                                    id='17'
                                    type="text"
                                    name="jobDescription17"
                                    value={description.jobDescription17 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='17'
                                    type="time"
                                    name="startWork17"
                                    value={start.startWork17 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='17'
                                    type="time"
                                    name="endWork17"
                                    value={end.endWork17 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[18].dayNumber}</p>

                                <input 
                                    id='18'
                                    type="text"
                                    name="jobDescription18"
                                    value={description.jobDescription18 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='18'
                                    type="time"
                                    name="startWork18"
                                    value={start.startWork18 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='18'
                                    type="time"
                                    name="endWork18"
                                    value={end.endWork18 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[19].dayNumber}</p>

                                <input 
                                    id='19'
                                    type="text"
                                    name="jobDescription19"
                                    value={description.jobDescription19 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='19'
                                    type="time"
                                    name="startWork19"
                                    value={start.startWork19 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='19'
                                    type="time"
                                    name="endWork19"
                                    value={end.endWork19 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[20].dayNumber}</p>

                                <input 
                                    id='20'
                                    type="text"
                                    name="jobDescription20"
                                    value={description.jobDescription20 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='20'
                                    type="time"
                                    name="startWork20"
                                    value={start.startWork20 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='20'
                                    type="time"
                                    name="endWork20"
                                    value={end.endWork20 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[21].dayNumber}</p>

                                <input 
                                    id='21'
                                    type="text"
                                    name="jobDescription21"
                                    value={description.jobDescription21 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='21'
                                    type="time"
                                    name="startWork21"
                                    value={start.startWork21 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='21'
                                    type="time"
                                    name="endWork21"
                                    value={end.endWork21 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[22].dayNumber}</p>

                                <input 
                                    id='22'
                                    type="text"
                                    name="jobDescription22"
                                    value={description.jobDescription22 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='22'
                                    type="time"
                                    name="startWork22"
                                    value={start.startWork22 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='22'
                                    type="time"
                                    name="endWork22"
                                    value={end.endWork22 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[23].dayNumber}</p>

                                <input 
                                    id='23'
                                    type="text"
                                    name="jobDescription23"
                                    value={description.jobDescription23 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='23'
                                    type="time"
                                    name="startWork23"
                                    value={start.startWork23 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='23'
                                    type="time"
                                    name="endWork23"
                                    value={end.endWork23 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[24].dayNumber}</p>

                                <input 
                                    id='24'
                                    type="text"
                                    name="jobDescription24"
                                    value={description.jobDescription24 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='24'
                                    type="time"
                                    name="startWork24"
                                    value={start.startWork24 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='24'
                                    type="time"
                                    name="endWork24"
                                    value={end.endWork24 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[25].dayNumber}</p>

                                <input 
                                    id='25'
                                    type="text"
                                    name="jobDescription25"
                                    value={description.jobDescription25 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='25'
                                    type="time"
                                    name="startWork25"
                                    value={start.startWork25 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='25'
                                    type="time"
                                    name="endWork25"
                                    value={end.endWork25 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[26].dayNumber}</p>

                                <input 
                                    id='26'
                                    type="text"
                                    name="jobDescription26"
                                    value={description.jobDescription26 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='26'
                                    type="time"
                                    name="startWork26"
                                    value={start.startWork26 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='26'
                                    type="time"
                                    name="endWork26"
                                    value={end.endWork26 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[27].dayNumber}</p>

                                <input 
                                    id='27'
                                    type="text"
                                    name="jobDescription27"
                                    value={description.jobDescription27 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='27'
                                    type="time"
                                    name="startWork27"
                                    value={start.startWork27 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='27'
                                    type="time"
                                    name="endWork27"
                                    value={end.endWork27 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[28].dayNumber}</p>

                                <input 
                                    id='28'
                                    type="text"
                                    name="jobDescription28"
                                    value={description.jobDescription28 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='28'
                                    type="time"
                                    name="startWork28"
                                    value={start.startWork28 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='28'
                                    type="time"
                                    name="endWork28"
                                    value={end.endWork28 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[29].dayNumber}</p>

                                <input 
                                    id='29'
                                    type="text"
                                    name="jobDescription29"
                                    value={description.jobDescription29 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='29'
                                    type="time"
                                    name="startWork29"
                                    value={start.startWork29 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='29'
                                    type="time"
                                    name="endWork29"
                                    value={end.endWork29 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='eachDay'>
                                <p>{days[30].dayNumber}</p>

                                <input 
                                    id='30'
                                    type="text"
                                    name="jobDescription30"
                                    value={description.jobDescription30 || ''}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='30'
                                    type="time"
                                    name="startWork30"
                                    value={start.startWork30 || '00:00'}
                                    onChange={handleChange}
                                />

                                <input 
                                    id='30'
                                    type="time"
                                    name="endWork30"
                                    value={end.endWork30 || '00:00'}
                                    onChange={handleChange}
                                />
                            </div>

                            

                            {/* {inputs.days.map( */}
                            {/* {days.map(
                                day =>
                                <div key={day.dayNumber} className='eachDay'>
                                    <p className='dateright'>{ day.dayNumber}</p>
                            
                                    <input className='jobright'
                                        id={day.dayNumber}
                                        type="text"
                                        name="jobDescription"
                                        value={inputs.jobDescription || ''}
                                        onChange={handleChange}
                                    />
                                    <input className='startright'
                                        id={day.dayNumber}
                                        type="time"
                                        name="startWork"
                                        value={inputs.startWork || ''}
                                        onChange={handleChange}
                                    />
                                    <input className='finishright'
                                        id={day.dayNumber}
                                        type="time"
                                        name="endWork"
                                        value={inputs.endWork || ''}
                                        onChange={handleChange}
                                    />                            

                                    <p className='totalright'>{ inputs.startTime !== inputs.finishTime &&
                                    JSON.stringify(calculate(timeToDecimal(inputs.startTime), timeToDecimal(inputs.finishTime))) }</p>
                            
                                </div>
                            ) } */}
                        
                        {/* this form format works
                        // ----------------------- */}
                            {/* <p className='dateright'>21</p>
                            
                            <input className='jobright'
                                type="text"
                                name="jobDescription"
                                value={inputs.jobDescription || ''}
                                onChange={handleChange}
                            />
                            <input className='startright'
                                type="time"
                                name="startTime"
                                value={inputs.startTime || ''}
                                onChange={handleChange}
                            />
                            <input className='finishright'
                                type="time"
                                name="finishTime"
                                value={inputs.finishTime || ''}
                                onChange={handleChange}
                            />
                            
                            
                            <p className='totalright'>{ inputs.startTime !== inputs.finishTime &&
                            JSON.stringify(calculate(timeToDecimal(inputs.startTime), timeToDecimal(inputs.finishTime))) }</p> */}
                        
                    </div>
                    {/* <div className='timecard'>
                        
                            
                            <p className='left22'>DATO / DATE</p>
                            <p className='left22'>JOB DESCRIPTION</p>
                            <p className='left22'>START: TIME</p>
                            <p className='left22'>FINISH: TIME</p>
                            <p className='left22'>TOTAL HOURS/TIMER</p>
                        
                        
                            <p className='dateright'>22</p>
                            
                            <input className='jobright'
                                type="text"
                                name="jobDescription22"
                                value={inputs.jobDescription22 || ''}
                                onChange={handleChange}
                            />
                            <input className='startright'
                                type="time"
                                name="startTime22"
                                value={inputs.startTime22 || ''}
                                onChange={handleChange}
                            />
                            <input className='finishright'
                                type="time"
                                name="finishTime22"
                                value={inputs.finishTime22 || ''}
                                onChange={handleChange}
                            />
                                                        
                            <p className='totalright'>{ inputs.startTime22 !== inputs.finishTime22 &&
                            JSON.stringify(calculate(timeToDecimal(inputs.startTime22), timeToDecimal(inputs.finishTime22))) }</p>
                        
                    </div> */}
                    <button className='uploadBtn' type="submit">Upload</button>
                </form>
            </div>
        )
    }
    

    const toScreen = (screen) => {
        setScreen(screen)
      }

    const handleGetHours = (hours) => {
        setHours(hours)
        toScreen('2')
    }

    const display = () => {
        if (screen === '1') {
            return <ScreenOne
                user={ user }
            />
          }else if (screen === '2') {
            return <ScreenTwo
                hours={ hours }
            />
          }else if (screen === '3') {
            return <ScreenThree/>
          }
    }
    


    
    return (
        <div>
            {display()}
        </div>    
    )
}

export default TimeCard