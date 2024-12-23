# 🎄 Advent of Code - 2024 🎄
| Part 1 | Part 2 |
| ------ | ------ |
| `893` | `cw,dy,ef,iw,ji,jv,ka,ob,qv,ry,ua,wt,xz` |

<h2>--- Day 23: LAN Party ---</h2><p>As The Historians wander around a secure area at Easter Bunny HQ, you come across posters for a LAN party scheduled for today! Maybe you can find it; you connect to a nearby datalink port and download a map of the local network (your puzzle input).</p>
<p>The network map provides a list of every <em>connection between two computers</em>. For example:</p>
<pre><code>kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
</code></pre>
<p>Each line of text in the network map represents a single connection; the line <code>kh-tc</code> represents a connection between the computer named <code>kh</code> and the computer named <code>tc</code>. Connections aren't directional; <code>tc-kh</code> would mean exactly the same thing.</p>
<p>LAN parties typically involve multiplayer games, so maybe you can locate it by finding groups of connected computers. Start by looking for <em>sets of three computers</em> where each computer in the set is connected to the other two computers.</p>
<p>In this example, there are <code>12</code> such sets of three inter-connected computers:</p>
<pre><code>aq,cg,yn
aq,vc,wq
co,de,ka
co,de,ta
co,ka,ta
de,ka,ta
kh,qp,ub
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn
ub,vc,wq
</code></pre>
<p>If the Chief Historian is here, <em>and</em> he's at the LAN party, it would be best to know that right away. You're pretty sure his computer's name starts with <code>t</code>, so consider only sets of three computers where at least one computer's name starts with <code>t</code>. That narrows the list down to <code><em>7</em></code> sets of three inter-connected computers:</p>
<pre><code>co,de,<em>ta</em>
co,ka,<em>ta</em>
de,ka,<em>ta</em>
qp,<em>td</em>,wh
<em>tb</em>,vc,wq
<em>tc</em>,<em>td</em>,wh
<em>td</em>,wh,yn
</code></pre>
<p>Find all the sets of three inter-connected computers. <em>How many contain at least one computer with a name that starts with <code>t</code>?</em></p>

<h2 id="part2">--- Part Two ---</h2><p>There are still way too many results to go through them all. You'll have to find the LAN party another way and go there yourself.</p>
<p>Since it doesn't seem like any employees are around, you figure they must all be at the LAN party. If that's true, the LAN party will be the <em>largest set of computers that are all connected to each other</em>. That is, for each computer at the LAN party, that computer will have a connection to every other computer at the LAN party.</p>
<p>In the above example, the largest set of computers that are all connected to each other is made up of <code>co</code>, <code>de</code>, <code>ka</code>, and <code>ta</code>. Each computer in this set has a connection to every other computer in the set:</p>
<pre><code>ka-co
ta-co
de-co
ta-ka
de-ta
ka-de
</code></pre>
<p>The LAN party posters say that the <em>password</em> to get into the LAN party is the name of every computer at the LAN party, sorted alphabetically, then joined together with commas. (The people running the LAN party are clearly a bunch of <span title="You caught me. I'm a giant nerd.">nerds</span>.) In this example, the password would be <code><em>co,de,ka,ta</em></code>.</p>
<p><em>What is the password to get into the LAN party?</em></p>
