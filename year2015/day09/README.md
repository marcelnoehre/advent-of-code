# 🎄 Advent of Code - 2015 🎄
| Part 1 | Part 2 |
| ------ | ------ |
| `207` | `804` |

<h2>--- Day 9: All in a Single Night ---</h2><p>Every year, Santa manages to deliver all of his presents in a single night.</p>
<p>This year, however, he has some <span title="Bonus points if you recognize all of the locations.">new locations</span> to visit; his elves have provided him the distances between every pair of locations.  He can start and end at any two (different) locations he wants, but he must visit each location exactly once.  What is the <em>shortest distance</em> he can travel to achieve this?</p>
<p>For example, given the following distances:</p>
<pre><code>London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
</code></pre>
<p>The possible routes are therefore:</p>
<pre><code>Dublin -> London -> Belfast = 982
London -> Dublin -> Belfast = 605
London -> Belfast -> Dublin = 659
Dublin -> Belfast -> London = 659
Belfast -> Dublin -> London = 605
Belfast -> London -> Dublin = 982
</code></pre>
<p>The shortest of these is <code>London -> Dublin -> Belfast = 605</code>, and so the answer is <code>605</code> in this example.</p>
<p>What is the distance of the shortest route?</p>

<h2 id="part2">--- Part Two ---</h2><p>The next year, just to show off, Santa decides to take the route with the <em>longest distance</em> instead.</p>
<p>He can still start and end at any two (different) locations he wants, and he still must visit each location exactly once.</p>
<p>For example, given the distances above, the longest route would be <code>982</code> via (for example) <code>Dublin -> London -> Belfast</code>.</p>
<p>What is the distance of the longest route?</p>
