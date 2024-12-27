/*
time 1239 151
couldn't solve used solution
come back to this

Problem
  input: array with subarrays [`start`, `end`]
  output: integer representing number of rooms
  objective: identify the minimum number of rooms required to hold all meetings without overlap
  rules:
    accept an array input
      array contains subarrays [`start`, `end`] as `meetings`
        ? can it be empty -> no
        ? can it be sparse? -> no
        ? can it ever have non-integer number types -> no
        ? can it ever have more than 2 elements? -> no
        ? is the start and end ever out of order? -> no
        - subarrays represent intervals for the meeting
          - e.g. [0, 15] means a meeting starting at 0 and ending at 15
        - intervals can overlap
          - eg. [0 - 15] and [10 - 15] refer to the same time between 10-15
      - `meetings` are not sorted in the outer array (i.e. first meeting could start after another)
      ? can it be emtpy -> no
      ? can it be sparse -> no
      ? can it contain other object types other than arrays? -> no
      ? is there a limit to number of subarrays? -> no
    - if a meeting overlaps, it cannot be used until the prior meeting is over
    - if a meeting ends at one time, another can start at the same time
      - e.g. [1 - 3] and [3 - 6] require only one room
    - find the number of rooms needed to hold all meetings
    - use the same room if there are no overlapping times
    - return the number of rooms required
Examples
  illustrative examples:
    Example I:
      Input: intervals = [[20, 25], [10, 15], [0, 25]]
      Output: 2
      Explanation: The first interview is scheduled from
                    time 0 to 25. The second interview is
                    from time 10 to 15 and overlaps with
                    the first interview, requiring a second
                    room. The third interview from 20 to 25
                    also overlaps with the first. Thus, a
                    minimum of two rooms are required.
      meeting 1: fill a room with those time slots
        [[20, 24]]
      meeting 2: iterate through room 1 and if any values are within range of meeting 2, start new room
        none are within 10, 15 so add them to room -> [[20, 24, 10, 15]]
      meeting 3: is 20 within 0, 25 -> yes so start a new room and add them
        [[20, 24, 10, 15]]
        [[0, 24]]

    Example II:
      Input: intervals = [[5, 9], [1, 3]]
      Output: 1
      Explanation: The first interview is scheduled from
                    time 5 to 9. The second interview is
                    from time 1 to 3. These two interviews
                    do not overlap, therefore only one
                    conference room is needed.
  example groups:
    "good" inputs / happy path:
      single meeting -> given
      multiple meetings no overlap -> given
      multiple meetings with overlap -> given
      meeting that starts as another ends (start === end of another) -> given
      out of order no overlap -> given
      out of order overlap -> given
    malformed inputs: asssume none
    missing inputs: assume none
    extra inputs: assume none
    special cases: n/a
Data Structure
  `rooms` to store the start and end times
Algorithm
  thoughts:
    overall structure
      iterate through meetings
      for each meeting, check if start and end times are overlapped by meeting
        if current meeting overlaps filled, start a new room, increase room counter
        if its empty, add the start and end times
  main program
    initialize rooms as [[]]
    initialize roomNumber as 0

    loop through meetings
      for each start/end time in current room number
        if start or end is covered by current meeting
          increase roomNumber
          break
      push current meetings to rooms[roomNumber]
    return rooms.lengthf


Scraped ideas:
    main program:
      initialize rooms as empty array with nested empty array
      initialize anchor as 0
      initialize runner as 0
      while runner < meetings length
        initialize start as meeting[0]
        initialize end as meeting[1] - 1
        if rooms[anchor][start] || rooms[anchor][end] is filled
          move anchor
          add push nested array
        else
          while start < end
            set rooms[anchor][start] to 'true'
          end
        end
        move runner

*/

function rooms(meetings) {

}

// console.log(rooms([[20, 25], [10, 15], [0, 25]]) === 2);
// console.log(rooms([[5, 9], [1, 3]]) === 1);
// console.log(rooms([[1, 2], [3, 4], [5, 6]]) === 1);
// console.log(rooms([[1, 4], [2, 5], [3, 6]]) === 3);
// console.log(rooms([[1, 3], [3, 6], [6, 8]]) === 1);
// console.log(rooms([[1, 10]]) === 1);
// console.log(rooms([[1, 3], [2, 4], [4, 6]]) === 2);
// console.log(rooms([[1, 5], [2, 3], [4, 6], [5, 7]]) === 2);
// console.log(rooms([[0, 5], [1, 3], [2, 6], [4, 7], [5, 9], [8, 10]]) === 3);
// console.log(rooms([[1, 2], [2, 3], [3, 4], [4, 5]]) === 1);
// console.log(rooms([[1, 20], [5, 10], [11, 15], [16, 18]]) === 2);
// console.log(rooms([[1, 4], [1, 3], [1, 2], [1, 5]]) === 4);
