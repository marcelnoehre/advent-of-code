# 🎄 Advent of Code - 2024 🎄
| Part 1 | Part 2 |
| ------ | ------ |
| `350` | `769668867512623` |

<h2>--- Day 19: Linen Layout ---</h2><p>Today, The Historians take you up to the hot springs on Gear Island! Very suspiciously, absolutely nothing goes wrong as they begin their careful search of the vast field of helixes.</p>
<p>Could this <em>finally</em> be your chance to visit the onsen next door? Only one way to find out.</p>
<p>After a brief conversation with the reception staff at the onsen front desk, you discover that you don't have the right kind of money to pay the admission fee. However, before you can leave, the staff get your attention. Apparently, they've heard about how you helped at the hot springs, and they're willing to make a deal: if you can simply help them <em>arrange their towels</em>, they'll let you in for <em>free</em>!</p>
<p>Every towel at this onsen is marked with a <em>pattern of colored stripes</em>. There are only a few patterns, but for any particular pattern, the staff can get you as many towels with that pattern as you need. Each <span title="It really seems like they've gathered a lot of magic into the towel colors.">stripe</span> can be <em>white</em> (<code>w</code>), <em>blue</em> (<code>u</code>), <em>black</em> (<code>b</code>), <em>red</em> (<code>r</code>), or <em>green</em> (<code>g</code>). So, a towel with the pattern <code>ggr</code> would have a green stripe, a green stripe, and then a red stripe, in that order. (You can't reverse a pattern by flipping a towel upside-down, as that would cause the onsen logo to face the wrong way.)</p>
<p>The Official Onsen Branding Expert has produced a list of <em>designs</em> - each a long sequence of stripe colors - that they would like to be able to display. You can use any towels you want, but all of the towels' stripes must exactly match the desired design. So, to display the design <code>rgrgr</code>, you could use two <code>rg</code> towels and then an <code>r</code> towel, an <code>rgr</code> towel and then a <code>gr</code> towel, or even a single massive <code>rgrgr</code> towel (assuming such towel patterns were actually available).</p>
<p>To start, collect together all of the available towel patterns and the list of desired designs (your puzzle input). For example:</p>
<pre><code>r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
</code></pre>
<p>The first line indicates the available towel patterns; in this example, the onsen has unlimited towels with a single red stripe (<code>r</code>), unlimited towels with a white stripe and then a red stripe (<code>wr</code>), and so on.</p>
<p>After the blank line, the remaining lines each describe a design the onsen would like to be able to display. In this example, the first design (<code>brwrr</code>) indicates that the onsen would like to be able to display a black stripe, a red stripe, a white stripe, and then two red stripes, in that order.</p>
<p>Not all designs will be possible with the available towels. In the above example, the designs are possible or impossible as follows:</p>
<ul>
<li><code>brwrr</code> can be made with a <code>br</code> towel, then a <code>wr</code> towel, and then finally an <code>r</code> towel.</li>
<li><code>bggr</code> can be made with a <code>b</code> towel, two <code>g</code> towels, and then an <code>r</code> towel.</li>
<li><code>gbbr</code> can be made with a <code>gb</code> towel and then a <code>br</code> towel.</li>
<li><code>rrbgbr</code> can be made with <code>r</code>, <code>rb</code>, <code>g</code>, and <code>br</code>.</li>
<li><code>ubwu</code> is <em>impossible</em>.</li>
<li><code>bwurrg</code> can be made with <code>bwu</code>, <code>r</code>, <code>r</code>, and <code>g</code>.</li>
<li><code>brgr</code> can be made with <code>br</code>, <code>g</code>, and <code>r</code>.</li>
<li><code>bbrgwb</code> is <em>impossible</em>.</li>
</ul>
<p>In this example, <code><em>6</em></code> of the eight designs are possible with the available towel patterns.</p>
<p>To get into the onsen as soon as possible, consult your list of towel patterns and desired designs carefully. <em>How many designs are possible?</em></p>

<h2 id="part2">--- Part Two ---</h2><p>The staff don't really like some of the towel arrangements you came up with. To avoid an endless cycle of towel rearrangement, maybe you should just give them every possible option.</p>
<p>Here are all of the different ways the above example's designs can be made:</p>
<p><code>brwrr</code> can be made in two different ways: <code>b</code>, <code>r</code>, <code>wr</code>, <code>r</code> <em>or</em> <code>br</code>, <code>wr</code>, <code>r</code>.</p>
<p><code>bggr</code> can only be made with <code>b</code>, <code>g</code>, <code>g</code>, and <code>r</code>.</p>
<p><code>gbbr</code> can be made 4 different ways:</p>
<ul>
<li><code>g</code>, <code>b</code>, <code>b</code>, <code>r</code></li>
<li><code>g</code>, <code>b</code>, <code>br</code></li>
<li><code>gb</code>, <code>b</code>, <code>r</code></li>
<li><code>gb</code>, <code>br</code></li>
</ul>
<p><code>rrbgbr</code> can be made 6 different ways:</p>
<ul>
<li><code>r</code>, <code>r</code>, <code>b</code>, <code>g</code>, <code>b</code>, <code>r</code></li>
<li><code>r</code>, <code>r</code>, <code>b</code>, <code>g</code>, <code>br</code></li>
<li><code>r</code>, <code>r</code>, <code>b</code>, <code>gb</code>, <code>r</code></li>
<li><code>r</code>, <code>rb</code>, <code>g</code>, <code>b</code>, <code>r</code></li>
<li><code>r</code>, <code>rb</code>, <code>g</code>, <code>br</code></li>
<li><code>r</code>, <code>rb</code>, <code>gb</code>, <code>r</code></li>
</ul>
<p><code>bwurrg</code> can only be made with <code>bwu</code>, <code>r</code>, <code>r</code>, and <code>g</code>.</p>
<p><code>brgr</code> can be made in two different ways: <code>b</code>, <code>r</code>, <code>g</code>, <code>r</code> <em>or</em> <code>br</code>, <code>g</code>, <code>r</code>.</p>
<p><code>ubwu</code> and <code>bbrgwb</code> are still impossible.</p>
<p>Adding up all of the ways the towels in this example could be arranged into the desired designs yields <code><em>16</em></code> (<code>2 + 1 + 4 + 6 + 1 + 2</code>).</p>
<p>They'll let you into the onsen as soon as you have the list. <em>What do you get if you add up the number of different ways you could make each design?</em></p>