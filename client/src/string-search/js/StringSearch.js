import React from "react";
import SearchVisualizer from "./SearchVisualizer";
import PrefixTable from "./PrefixTable";
import "../css/StringSearch.css";

export default function StringSearch() {
	document.title = "String Searching";

	return (
		<div className="string-search">
			<div id="background">
				<main id="main-container">
					<div>
						<h1>String-Searching Algorithms</h1>
						<h3>visualizations & analyses</h3>
					</div>
					<hr></hr>
					<h2>Introduction</h2>
					<div className="text-box">
						<p>
							For the scope of this discussion, we will define string-searching
							algorithms as algorithms that identify if and where a string
							exists within a larger string. Remember, a string is just a
							sequence of characters. For example, an application of a
							string-searching algorithm could be to find the number of times
							and places a specific word occurs in a book. In this analysis
							however, we will be searching fictitious DNA sequences for
							fictitious genes. We will consider different approaches to
							implementing such an algorithm, building incrementally in
							complexity and runtime efficiency.
						</p>
					</div>
					<hr></hr>
					<h2>The Naive Approach</h2>
					<div className="text-box">
						<p>
							Suppose you were given a DNA sequence and told to find if and
							where a given gene exists within that sequence. How would you
							approach this problem? A common first implementation of this
							algorithm is to iterate character by character over the DNA
							sequence, and see if that character matches the first character of
							our gene. Then, if the characters match, we compare the next
							character of the sequence with the next character of our gene,
							finding a match if all characters of the gene ultimately match
							those in the DNA sequence. If at any point we encounter a
							mismatch, we restart this process from the second character of the
							sequence, then the third, and so on. To visualize this algorithm,
							we'll use the string <code>ATCAGCTAAGCTAGCTAGTE</code> as our DNA
							sequence, and search for the string <code>TAG</code> as our gene.
						</p>
					</div>
					<SearchVisualizer
						algo="naive"
						sequence="ATCAGCTAAGCTAGCTAGTE"
						string="TAG"
					/>
					<div className="text-box">
						<p>
							That wasn't too bad. For most characters in the DNA sequence, we
							could perform one comparison and know our gene does not begin at
							that character. This is because our DNA sequence did not contain
							many near matches. However, this is not an assumption we can make
							about our data&mdash;sometimes many near matches will exist within
							the sequence. Let's examine such a case. This time, we'll use the
							string <code>AGCAGCAGCAGCAGCAGCTA</code> as our DNA sequence, and
							search for the string <code>AGCT</code> as our gene.
						</p>
					</div>
					<SearchVisualizer
						algo="naive"
						sequence="AGCAGCAGCAGCAGCAGCTA"
						string="AGCT"
					/>
					<hr></hr>
					<h3>Naive Time Complexity</h3>
					<div className="text-box">
						<p>
							Before we move on to examining some more efficient algorithms,
							let's take a moment to analyze the runtime of the naive algorithm.
							Computer scientists often evaluate runtime efficiency using Big O
							notation&mdash;this describes how runtime grows with respect to
							input size. For example, if an algorithm is O(<i>n</i>
							<sup>2</sup>), this means the runtime grows no faster than the
							size of the input squared in the worst case. In order to establish
							a consistent way to measure the runtime of these algorithms, let's
							use the variable <i>m</i> to represent the length of the DNA
							sequence, and the variable <i>n</i> the length of the gene. In the
							worst case, our gene matches the DNA sequence by all but the last
							character. So, <i>m</i> checks must be done in the first
							iteration, then m - 1, m - 2, etc., and there are <i>n</i>{" "}
							iterations total. Thus, this algorithm's runtime grows at a rate
							no faster than <i>m</i> * <i>n</i>, and so is O(<i>m</i> *{" "}
							<i>n</i>).
						</p>
					</div>
					<div className="text-box">
						<p>
							Finally, let's consider the best case runtime of the naive
							algorithm. Just as we use Big O notation to represent worst case
							runtime, we use Big Omega to represent best case runtime. In the
							best case, the gene and DNA sequence are identical, and so just{" "}
							<i>m</i> work on the first iteration is needed to find a
							match&mdash;&#937;(<i>m</i>). In the next section, we'll discuss
							how we can improve these runtimes with smarter string-searching
							algorithms!
						</p>
					</div>
					<hr></hr>
					<h2>Knuth-Morris-Pratt Algorithm</h2>
					<div className="text-box">
						<p>
							The previous visualization demonstrated a major weakness of the
							naive approach. When there are many near matches in the DNA
							sequence, the naive algorithm will inefficiently backtrack,
							checking characters it should already know do not match. The
							Knuth-Morris-Pratt algorithm improves upon the naive algorithm by
							using information from previously matched characters to determine
							where the gene might occur next. For example, let's examine the
							behavior of these algorithms after matching <code>AGC</code> in
							the above example. Upon finding a mismatch, (<code>T</code> !={" "}
							<code>A</code>), the naive algorithm backtracks and restarts its
							search from <code>G</code>. However, the KMP algorithm never
							backtracks, and instead shifts the first character of the gene to
							the mismatched character in the sequence. The KMP algorithm can do
							this because it knows the previous three characters were matches (
							<code>AGC</code>), and nowhere further in this string can the gene{" "}
							<code>AGCT</code> begin. Thus, the algorithm wastes no time and
							eliminates all previous characters as possible substrings of the
							gene. Notice the improved efficiency of this algorithm below.
						</p>
					</div>
					<SearchVisualizer
						algo="KMP"
						sequence="AGCAGCAGCAGCAGCAGCTA"
						string="AGCT"
						showTable={false}
					/>
					<hr></hr>
					<h3>The Prefix Table</h3>
					<div className="text-box">
						<p>
							You might be wondering, how exactly does the algorithm know when
							it can skip previously matched characters? Unlike the naive
							algorithm, KMP does some initial work before the matching process
							to help it run more efficiently. When a mismatch occurs, the
							algorithm looks up the mismatched index of the gene in a prefix
							table created at the start of the program. This table tells the
							algorithm at any particular index (character in the gene) how long
							the longest proper prefix that is also a suffix is within the
							substring. Let's look at an example with the gene{" "}
							<code>ACTGAECTE</code>.
						</p>
					</div>
					<PrefixTable
						prefixTable={[0, 0, 0, 0, 1, 2, 3, 0, 1]}
						string="ACTGACTCA"
					/>
					<div className="text-box">
						<p>
							The first four letters have values of zero, as the substrings{" "}
							<code>A</code>, <code>AC</code>, <code>ACT</code>, and{" "}
							<code>ACTG</code> have no prefix which is also a suffix. However,
							the substring ending with the fifth letter (<code>ACTGA</code>)
							has a prefix which is also a suffix (<code>A</code>) of length 1.
							Likewise, the substring ending with the seventh letter (
							<code>ACTGACT</code>) has a prefix which is also a suffix (
							<code>ACT</code>) of length 3. This prefix table is important, as
							it allows the algorithm to avoid unnecessary backtracking. If we
							encounter a mismatch and the value at the current index is zero,
							we know our gene does not begin at any previous index, and so we
							can move forward without backtracking. However, if we find a value
							greater than zero, it is possible the current suffix is the prefix
							of our gene, and so we continue searching for the rest of the
							gene. Below is a more complex visualization of the KMP algorithm
							with some non-zero values in the prefix table.
						</p>
					</div>
					<SearchVisualizer
						algo="KMP"
						sequence="AGACACCAGGACGACACGGA"
						string="ACACGG"
					/>
					<h3>KMP Time Complexity</h3>
					<div className="text-box">
						<p>
							Let's use the notation described earlier to classify the best and
							worst case runtimes of this algorithm. Because the KMP algorithm
							only performs differently than the naive algorithm at a mismatch,
							it has a no better best case runtime of &#937;(<i>m</i>). The
							remarkable efficiency gain is in the worst case&mdash;KMP is also
							O(<i>m</i>). This is because the algorithm never backtracks, it
							will never revisit a previously examined character in the
							sequence. In this analysis, we will not discuss how the algorithm
							that builds the prefix table works, but know that it too runs in
							linear time proportional to <i>m</i>, and so does not affect the
							overall time complexity of the algorithm.
						</p>
					</div>
					<hr></hr>
					<h2>Boyer-Moore Algorithm</h2>
					<div className="text-box">
						<p>
							The KMP algorithm is great&mdash;guaranteed linear runtime is a
							significant improvement upon the naive algorithm...but can we do
							better? This final string-searching algorithm first proposed by
							Robert Boyer and Strother Moore in 1977 uses clever tricks to (on
							average) search strings in much faster than linear time. The
							algorithm works similarly to the naive approach, iteratively
							checking alignments of the search string with the sequence string.
							However, unlike the previous algorithms Boyer-Moore compares
							characters from right-to-left. As you will see below, this unique
							approach is what enables this algorithm's two rules to efficiently
							skip fruitless alignments.
						</p>
					</div>
					<h3>The Bad Character Rule</h3>
					<div className="text-box">
						<p>
							The Bad Character Rule is one of two rules used by the Boyer-Moore
							algorithm upon encountering a mismatch to determine how many
							alignments can be skipped in the next iteration. The rule
							stipulates that the mismatched character in the sequence should be
							searched for in the search string, and if found, the search string
							should be shifted such that the character aligns with the
							mismatched character in the sequence string. If the mismatched
							character is not present in the search string, the string can be
							shifted just beyond the index of the mismatched character. Let's
							examine the logic behind this rule. Working from right-to-left,
							imagine you encounter a mismatch between the sequence and search
							string. Now also imagine you know the mismatched character exists
							at an index further to the left in the search string. Knowing this
							information, you can conclude that any of the following alignments
							tested in which this character in the search string is not aligned
							with the sequence string will fail. Likewise, if you know the
							mismatched character is not present in the search string, you can
							realize that any future alignment which attempts to match this
							mismatched character will fail. Together, these insights allow us
							to skip many alignments which we know would fail, thus making the
							algorithm more efficient. This is a tricky concept to explain, so
							let's visualize it below.
						</p>
					</div>
					<SearchVisualizer
						algo="Boyer-Moore"
						sequence="AGACACCAGGACGACACGGA"
						string="ACACGG"
					/>
					<div className="text-box">
						<p>
							In the first iteration of the above algorithm, the rightmost
							character of the search string is compared with the sequence
							string. <code>G</code> and <code>C</code> don't match, so the
							algorithm searches for the mismatched character <code>C</code>{" "}
							inside of the search string (<code>ACACGG</code>). It is found two
							characters to the left, so the search string is shifted to the
							right by two to align the two <code>C</code>s. Then, the righmost
							character is again compared with the sequence string, and another
							mismatch occurs (<code>G</code> != <code>A</code>). <code>A</code>{" "}
							is found three characters to the left in the search string, and so
							the string is shifted to the right by three. Remember too that if
							the mismatched character is not found in the search string, it can
							be shifted to the right by the entire length of the string! In
							these ideal conditions where the first character checked is a
							mismatch, the Boyer-Moore algorithm can be incredibly efficient as
							it skips along the sequence string multiple characters at a time.
						</p>
					</div>
					<h3>The Good Suffix Rule</h3>
					<div className="text-box">
						<p>
							Like the Bad Character Rule, the Good Suffix Rule uses information
							we know from the current alignment to determine if any future
							alignments can be skipped. Where the previous rule checked for the
							existence of a mismatched character found in the sequence string,
							this rule will search for previously matched characters in the
							search string. If these matched characters are found, the search
							string is shifted such that these characters align with the
							matched characters in the sequence string. Also like the previous
							rule, if these characters are not found the search string is
							shifted just beyond the index of the matched characters. So why
							does this work? Imagine you encounter a mismatch after a couple
							successful matches, and find these matches further to the left in
							the search string. Knowing this, you can conclude that any
							subsequent alignments tested in which these characters are not
							aligned with the matched characters in the sequence string will
							fail. Furthermore, if you fail to find any of the matched
							characters in the search string, you know future alignments that
							attempt to match with the previously matched characters in the
							sequence string will fail. The use of these two powerful rules in
							conjunction has made the Boyer-Moore algorithm the standard in
							string-searching algorithms since its initial discovery many
							decades ago.
						</p>
					</div>
					<h3>Boyer-Moore Time Complexity</h3>
					<div className="text-box">
						<p>
							Finally, let's classify this algorithm's runtime. In the best
							case, each alignment mismatches on the first character examined
							and the Bad Character Rule shifts the search string entirely
							beyond the current index (the mismatched character was not found
							further along in the search string). In this case, just <i>m</i>/
							<i>n</i> alignments are tested, so the algorithm is &#937;(
							<i>m</i>/<i>n</i>). Unfortunately, Boyer-Moore has a worse worst
							case than KMP of O(<i>m</i> * <i>n</i>). For example, when the
							search string is very similar to the sequence string neither rule
							can eliminate any future alignments and so all <i>m</i> alignments
							must be tested for each <i>n</i> character in the search string.
							Thankfully, this case is very rare, and on average the better best
							case runtime of this algorithm makes it the fastest
							string-searching algorithm for most applications. It is important
							to note that like KMP, Boyer-Moore does preprocessing work to
							allow its rules to work in constant time. Also like KMP, these
							preprocessing algorithms run in linear time proportional to{" "}
							<i>m</i>, and so do not significantly affect the overall time
							complexity of the algorithm.
						</p>
					</div>
					<hr></hr>
					<h2>The Trie Data Structure</h2>
					<img
						alt="example of a trie data structure"
						src="/string-search/images/Trie_example.svg"
					/>
				</main>
			</div>
		</div>
	);
}
