# 🎄 Advent of Code - 2024 🎄
| Part 1 | Part 2 |
| ------ | ------ |
| `1485656` | `899196` |

<h2>--- Day 12: Garden Groups ---</h2><p>Why not search for the Chief Historian near the gardener and his massive farm? There's plenty of food, so The Historians grab something to eat while they search.</p>
<p>You're about to settle near a complex arrangement of garden plots when some Elves ask if you can lend a hand. They'd like to set up <span title="I originally wanted to title this puzzle &quot;Fencepost Problem&quot;, but I was afraid someone would then try to count fenceposts by mistake and experience a fencepost problem.">fences</span> around each region of garden plots, but they can't figure out how much fence they need to order or how much it will cost. They hand you a map (your puzzle input) of the garden plots.</p>
<p>Each garden plot grows only a single type of plant and is indicated by a single letter on your map. When multiple garden plots are growing the same type of plant and are touching (horizontally or vertically), they form a <em>region</em>. For example:</p>
<pre><code>AAAA
BBCD
BBCC
EEEC
</code></pre>
<p>This 4x4 arrangement includes garden plots growing five different types of plants (labeled <code>A</code>, <code>B</code>, <code>C</code>, <code>D</code>, and <code>E</code>), each grouped into their own region.</p>
<p>In order to accurately calculate the cost of the fence around a single region, you need to know that region's <em>area</em> and <em>perimeter</em>.</p>
<p>The <em>area</em> of a region is simply the number of garden plots the region contains. The above map's type <code>A</code>, <code>B</code>, and <code>C</code> plants are each in a region of area <code>4</code>. The type <code>E</code> plants are in a region of area <code>3</code>; the type <code>D</code> plants are in a region of area <code>1</code>.</p>
<p>Each garden plot is a square and so has <em>four sides</em>. The <em>perimeter</em> of a region is the number of sides of garden plots in the region that do not touch another garden plot in the same region. The type <code>A</code> and <code>C</code> plants are each in a region with perimeter <code>10</code>. The type <code>B</code> and <code>E</code> plants are each in a region with perimeter <code>8</code>. The lone <code>D</code> plot forms its own region with perimeter <code>4</code>.</p>
<p>Visually indicating the sides of plots in each region that contribute to the perimeter using <code>-</code> and <code>|</code>, the above map's regions' perimeters are measured as follows:</p>
<pre><code>+-+-+-+-+
|A A A A|
+-+-+-+-+     +-+
              |D|
+-+-+   +-+   +-+
|B B|   |C|
+   +   + +-+
|B B|   |C C|
+-+-+   +-+ +
          |C|
+-+-+-+   +-+
|E E E|
+-+-+-+
</code></pre>
<p>Plants of the same type can appear in multiple separate regions, and regions can even appear within other regions. For example:</p>
<pre><code>OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
</code></pre>
<p>The above map contains <em>five</em> regions, one containing all of the <code>O</code> garden plots, and the other four each containing a single <code>X</code> plot.</p>
<p>The four <code>X</code> regions each have area <code>1</code> and perimeter <code>4</code>. The region containing <code>21</code> type <code>O</code> plants is more complicated; in addition to its outer edge contributing a perimeter of <code>20</code>, its boundary with each <code>X</code> region contributes an additional <code>4</code> to its perimeter, for a total perimeter of <code>36</code>.</p>
<p>Due to "modern" business practices, the <em>price</em> of fence required for a region is found by <em>multiplying</em> that region's area by its perimeter. The <em>total price</em> of fencing all regions on a map is found by adding together the price of fence for every region on the map.</p>
<p>In the first example, region <code>A</code> has price <code>4 * 10 = 40</code>, region <code>B</code> has price <code>4 * 8 = 32</code>, region <code>C</code> has price <code>4 * 10 = 40</code>, region <code>D</code> has price <code>1 * 4 = 4</code>, and region <code>E</code> has price <code>3 * 8 = 24</code>. So, the total price for the first example is <code><em>140</em></code>.</p>
<p>In the second example, the region with all of the <code>O</code> plants has price <code>21 * 36 = 756</code>, and each of the four smaller <code>X</code> regions has price <code>1 * 4 = 4</code>, for a total price of <code><em>772</em></code> (<code>756 + 4 + 4 + 4 + 4</code>).</p>
<p>Here's a larger example:</p>
<pre><code>RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
</code></pre>
<p>It contains:</p>
<ul>
<li>A region of <code>R</code> plants with price <code>12 * 18 = 216</code>.</li>
<li>A region of <code>I</code> plants with price <code>4 * 8 = 32</code>.</li>
<li>A region of <code>C</code> plants with price <code>14 * 28 = 392</code>.</li>
<li>A region of <code>F</code> plants with price <code>10 * 18 = 180</code>.</li>
<li>A region of <code>V</code> plants with price <code>13 * 20 = 260</code>.</li>
<li>A region of <code>J</code> plants with price <code>11 * 20 = 220</code>.</li>
<li>A region of <code>C</code> plants with price <code>1 * 4 = 4</code>.</li>
<li>A region of <code>E</code> plants with price <code>13 * 18 = 234</code>.</li>
<li>A region of <code>I</code> plants with price <code>14 * 22 = 308</code>.</li>
<li>A region of <code>M</code> plants with price <code>5 * 12 = 60</code>.</li>
<li>A region of <code>S</code> plants with price <code>3 * 8 = 24</code>.</li>
</ul>
<p>So, it has a total price of <code><em>1930</em></code>.</p>
<p><em>What is the total price of fencing all regions on your map?</em></p>

<h2 id="part2">--- Part Two ---</h2><p>Fortunately, the Elves are trying to order so much fence that they qualify for a <em>bulk discount</em>!</p>
<p>Under the bulk discount, instead of using the perimeter to calculate the price, you need to use the <em>number of sides</em> each region has. Each straight section of fence counts as a side, regardless of how long it is.</p>
<p>Consider this example again:</p>
<pre><code>AAAA
BBCD
BBCC
EEEC
</code></pre>
<p>The region containing type <code>A</code> plants has <code>4</code> sides, as does each of the regions containing plants of type <code>B</code>, <code>D</code>, and <code>E</code>. However, the more complex region containing the plants of type <code>C</code> has <code>8</code> sides!</p>
<p>Using the new method of calculating the per-region price by multiplying the region's area by its number of sides, regions <code>A</code> through <code>E</code> have prices <code>16</code>, <code>16</code>, <code>32</code>, <code>4</code>, and <code>12</code>, respectively, for a total price of <code><em>80</em></code>.</p>
<p>The second example above (full of type <code>X</code> and <code>O</code> plants) would have a total price of <code><em>436</em></code>.</p>
<p>Here's a map that includes an E-shaped region full of type <code>E</code> plants:</p>
<pre><code>EEEEE
EXXXX
EEEEE
EXXXX
EEEEE
</code></pre>
<p>The E-shaped region has an area of <code>17</code> and <code>12</code> sides for a price of <code>204</code>. Including the two regions full of type <code>X</code> plants, this map has a total price of <code><em>236</em></code>.</p>
<p>This map has a total price of <code><em>368</em></code>:</p>
<pre><code>AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA
</code></pre>
<p>It includes two regions full of type <code>B</code> plants (each with <code>4</code> sides) and a single region full of type <code>A</code> plants (with <code>4</code> sides on the outside and <code>8</code> more sides on the inside, a total of <code>12</code> sides). Be especially careful when counting the fence around regions like the one full of type <code>A</code> plants; in particular, each section of fence has an in-side and an out-side, so the fence does not connect across the middle of the region (where the two <code>B</code> regions touch diagonally). (The Elves would have used the M&ouml;bius Fencing Company instead, but their contract terms were too one-sided.)</p>
<p>The larger example from before now has the following updated prices:</p>
<ul>
<li>A region of <code>R</code> plants with price <code>12 * 10 = 120</code>.</li>
<li>A region of <code>I</code> plants with price <code>4 * 4 = 16</code>.</li>
<li>A region of <code>C</code> plants with price <code>14 * 22 = 308</code>.</li>
<li>A region of <code>F</code> plants with price <code>10 * 12 = 120</code>.</li>
<li>A region of <code>V</code> plants with price <code>13 * 10 = 130</code>.</li>
<li>A region of <code>J</code> plants with price <code>11 * 12 = 132</code>.</li>
<li>A region of <code>C</code> plants with price <code>1 * 4 = 4</code>.</li>
<li>A region of <code>E</code> plants with price <code>13 * 8 = 104</code>.</li>
<li>A region of <code>I</code> plants with price <code>14 * 16 = 224</code>.</li>
<li>A region of <code>M</code> plants with price <code>5 * 6 = 30</code>.</li>
<li>A region of <code>S</code> plants with price <code>3 * 6 = 18</code>.</li>
</ul>
<p>Adding these together produces its new total price of <code><em>1206</em></code>.</p>
<p><em>What is the new total price of fencing all regions on your map?</em></p>