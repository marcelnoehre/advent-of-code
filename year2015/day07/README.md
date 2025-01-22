# 🎄 Advent of Code - 2015 🎄
| Part 1 | Part 2 |
| ------ | ------ |
| `46065` | `14134` |

<h2>--- Day 7: Some Assembly Required ---</h2><p>This year, Santa brought little Bobby Tables a set of wires and bitwise logic gates!  Unfortunately, little Bobby is a little under the recommended age range, and he needs help <span title="You had one of these as a kid, right?">assembling the circuit</span>.</p>
<p>Each wire has an identifier (some lowercase letters) and can carry a 16-bit signal (a number from <code>0</code> to <code>65535</code>).  A signal is provided to each wire by a gate, another wire, or some specific value. Each wire can only get a signal from one source, but can provide its signal to multiple destinations.  A gate provides no signal until all of its inputs have a signal.</p>
<p>The included instructions booklet describes how to connect the parts together: <code>x AND y -> z</code> means to connect wires <code>x</code> and <code>y</code> to an AND gate, and then connect its output to wire <code>z</code>.</p>
<p>For example:</p>
<ul>
<li><code>123 -> x</code> means that the signal <code>123</code> is provided to wire <code>x</code>.</li>
<li><code>x AND y -> z</code> means that the bitwise AND of wire <code>x</code> and wire <code>y</code> is provided to wire <code>z</code>.</li>
<li><code>p LSHIFT 2 -> q</code> means that the value from wire <code>p</code> is left-shifted by <code>2</code> and then provided to wire <code>q</code>.</li>
<li><code>NOT e -> f</code> means that the bitwise complement of the value from wire <code>e</code> is provided to wire <code>f</code>.</li>
</ul>
<p>Other possible gates include <code>OR</code> (bitwise OR) and <code>RSHIFT</code> (right-shift).  If, for some reason, you'd like to <em>emulate</em> the circuit instead, almost all programming languages (for example, C, JavaScript, or Python) provide operators for these gates.</p>
<p>For example, here is a simple circuit:</p>
<pre><code>123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
</code></pre>
<p>After it is run, these are the signals on the wires:</p>
<pre><code>d: 72
e: 507
f: 492
g: 114
h: 65412
i: 65079
x: 123
y: 456
</code></pre>
<p>In little Bobby's kit's instructions booklet (provided as your puzzle input), what signal is ultimately provided to <em>wire <code>a</code></em>?</p>

<h2 id="part2">--- Part Two ---</h2><p>Now, take the signal you got on wire <code>a</code>, override wire <code>b</code> to that signal, and reset the other wires (including wire <code>a</code>).  What new signal is ultimately provided to wire <code>a</code>?</p>
