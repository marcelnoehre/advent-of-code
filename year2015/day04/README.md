# 🎄 Advent of Code - 2015 🎄
| Part 1 | Part 2 |
| ------ | ------ |
| `117946` | `3938038` |

<h2>--- Day 4: The Ideal Stocking Stuffer ---</h2><p>Santa needs help mining some <span title="Hey, mined your own business!">AdventCoins</span> (very similar to bitcoins) to use as gifts for all the economically forward-thinking little girls and boys.</p>
<p>To do this, he needs to find MD5 hashes which, in hexadecimal, start with at least <em>five zeroes</em>.  The input to the MD5 hash is some secret key (your puzzle input, given below) followed by a number in decimal. To mine AdventCoins, you must find Santa the lowest positive number (no leading zeroes: <code>1</code>, <code>2</code>, <code>3</code>, ...) that produces such a hash.</p>
<p>For example:</p>
<ul>
<li>If your secret key is <code>abcdef</code>, the answer is <code>609043</code>, because the MD5 hash of <code>abcdef609043</code> starts with five zeroes (<code>000001dbbfa...</code>), and it is the lowest such number to do so.</li>
<li>If your secret key is <code>pqrstuv</code>, the lowest number it combines with to make an MD5 hash starting with five zeroes is <code>1048970</code>; that is, the MD5 hash of <code>pqrstuv1048970</code> looks like <code>000006136ef...</code>.</li>
</ul>

<h2 id="part2">--- Part Two ---</h2><p>Now find one that starts with <em>six zeroes</em>.</p>
