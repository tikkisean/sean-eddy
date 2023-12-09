import "../css/LangCompare.css";

export default function LangCompare() {
	document.title = "Comparing Programming Languages";

	return (
		<div className="lang-compare">
			<div id="background">
				<main id="main-container">
					<div>
						<h1>Comparing Programming Languages</h1>
					</div>
					<hr></hr>
					<h2>Introduction</h2>
					<p>
						In this article, we will compare and contrast three of the most
						popular programming languages&#8212;Python, Java, and C. We will
						discuss the development experience, underlying implementation, and
						runtime efficiency of a comparable program in each language. Our
						analysis will begin at the highest-level language, building in
						complexity toward the lowest-level.
					</p>
					<hr></hr>
					<div className="lang-title">
						<h2>Python</h2>
						<img alt="Python logo." src="/lang-compare/images/python.svg" />
					</div>
					<p>
						Python is the highest-level language we will discuss in this
						analysis&#8212;this language's focus is on streamlining development
						at the cost of longer execution times. Python is an interpreted
						language; executing a Python script requires the use of the Python
						interpreter. The use of an interpreter allows scripts to run
						identically across any number of platforms assuming the appropriate
						platform-dependent interpreter is installed. However, this
						flexibility comes at the expense of runtime efficiency. Each time
						the script is ran the interpreter must parse the program
						line-by-line and determine the relevant functions to execute. The
						alternative to this approach is a compiled language which directly
						executes machine code at runtime&#8212;we will expand upon this idea
						in the following sections.
					</p>
					<p>
						Python's interpreted nature and focus on minimal development allow
						the interpreter to manage many tasks otherwise left to the
						programmer to manage in other languages. For example, Python is a
						dynamically typed language&#8212;variable types are not pre-defined
						and variables can assume any type at runtime. Again, this
						convenience is at the expense of runtime efficiency as the
						interpreter must determine and assign variable types at runtime.
						Python also manages garbage collection and memory allocation,
						further minimizing development time.
					</p>
					<h3>Python Performance</h3>
					<p>
						In this and each of the following sections we will discuss an
						example implementation of a common program and the relative
						efficiency of each language's implementation. We will implement the
						sorting algorithm selection sort due to its simple algorithm and
						consistent performance. Selection sort iteratively finds the minimum
						value in an array, swapping it with the value at the beginning of
						the unsorted subarray. This algorithm is very inefficient as it is
						O(n<sup>2</sup>) in both the worst and average cases, however this
						inefficiency will ensure consistent performance across languages.
						Consider the Python implementation of selection sort provided below.
					</p>
					<pre className="prettyprint">
						import random<br></br>
						import sys<br></br>
						import time<br></br>
						<br></br>n = int(sys.argv&#91;1)<br></br>
						vals = &#91;random.randint(0, n - 1) for i in range(n)&#93;
						<br></br>
						start = time.time()<br></br>
						for i in range(n):<br></br>
						&emsp;&emsp;min_i = i<br></br>
						&emsp;&emsp;for j in range(i + 1, n):<br></br>
						&emsp;&emsp;&emsp;&emsp;if vals&#91;j&#93; &#60;
						vals&#91;min_i&#93;:
						<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;min_i = j<br></br>
						&emsp;&emsp;if min_i != i:<br></br>
						&emsp;&emsp;&emsp;&emsp;vals&#91;i&#93;, vals&#91;min_i&#93; =
						vals&#91;min_i&#93;, vals&#91;i&#93;
						<br></br>
						print(time.time() - start)<br></br>
					</pre>
					<p>
						Note the readable syntax and minimal number of characters. Some
						operations like initializing the list of values and swapping values
						at indices can be accomplished in one line while other languages
						often use multiple lines to perform the same task. The relative
						brevity of Python's syntax will become more apparent as we analyze
						other lower-level languages with more explicit syntax requirements.
						Below is a graph of execution time on sample inputs of varying size.
						Again, these results will have greater meaning relative to the
						performance of the following languages.
					</p>
					<img
						alt="Graph showing Python selection sort execution time."
						src="/lang-compare/images/python-time.png"
					/>
					<hr></hr>
					<div className="lang-title">
						<h2>Java</h2>
						<img alt="Java logo." src="/lang-compare/images/java.svg" />
					</div>
					<p>
						Java offers a unique balance in performance and ease of development
						as it is neither a compiled nor interpreted language in the
						traditional sense. Unlike Python, Java source code is first compiled
						into a .class file, however this file is not directly executable
						machine code. The Java compiler produces Java bytecode, the
						instruction set of the Java virtual machine. The Java virtual
						machine then interprets these instructions and compiles them into
						machine code at runtime. This hybrid approach enables the platform
						independence characteristic of an interpreted language through the
						use of the Java virtual machine while drastically improving runtime
						efficiency by interpreting compiled instructions.
					</p>
					<p>
						Because type checking is done at compile time, Java is a statically
						typed language. Variable types must be declared and cannot change
						throughout their lifetime. However, Java also manages garbage
						collection and memory allocation making for a relatively streamlined
						development process. While its syntax is not quite as simple as a
						purely interpreted language like Python, Java boasts surprisingly
						good performance for its relative ease of use.
					</p>
					<h3>Java Performance</h3>
					<pre className="prettyprint">
						public class Sort &#123;<br></br>
						&emsp;&emsp;public static void main(String args[]) &#123;<br></br>
						&emsp;&emsp;&emsp;&emsp;int n = Integer.parseInt(args[0]);<br></br>
						&emsp;&emsp;&emsp;&emsp;System.out.println(n);<br></br>
						&emsp;&emsp;&emsp;&emsp;int vals[] = new int[n];<br></br>
						&emsp;&emsp;&emsp;&emsp;for (int i = 0; i &#60; n; i++) &#123;
						<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;vals[i] = (int) (Math.random() *
						n);<br></br>
						&emsp;&emsp;&emsp;&emsp;&#125;<br></br>
						<br></br>
						&emsp;&emsp;&emsp;&emsp;long start = System.nanoTime();<br></br>
						&emsp;&emsp;&emsp;&emsp;for (int i = 0; i &#60; n - 1; i++) &#123;
						<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;int min_i = i;<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;for (int j = i + 1; j &#60; n;
						j++) &#123;<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;if (vals[j] &#60;
						vals[min_i]) &#123;<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;min_i =
						j;<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&#125;<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&#125;<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;if (min_i != i) &#123;<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;int tmp = vals[i];
						<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;vals[i] =
						vals[min_i];<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;vals[min_i] = tmp;
						<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&#125;<br></br>
						&emsp;&emsp;&emsp;&emsp;&#125;<br></br>
						&emsp;&emsp;&emsp;&emsp;System.out.println((double)
						(System.nanoTime() - start) / 1000000000);<br></br>
						&emsp;&emsp;&#125;<br></br>
						&#125;<br></br>
					</pre>
					<p>
						This Java implementation of selection sort is nearly double the
						number of lines as before, mostly due to the extra space taken up by
						the curly braces Java uses to define scope. Simple tasks like
						initializing an array and swapping values require more explicit
						instructions.
					</p>
					<img
						alt="Graph showing Java selection sort execution time."
						src="/lang-compare/images/java-time.png"
					/>
					<p>
						Note the considerable performance gain with Java relative to the
						Python implementation. The largest input took no more than 100
						milliseconds, a nearly 50x improvement on Python's 4.5 seconds. This
						is not necessarily an equivalent comparison as these times do not
						account for compilation time, however the program must only be
						compiled once.
					</p>
					<hr></hr>
					<div className="lang-title">
						<h2>C</h2>
						<img alt="C logo." src="/lang-compare/images/c.svg" />
					</div>
					<p>
						Finally we reach C, the language built for high performance. C is a
						compiled language; compiling C source code produces native machine
						code directly executable on that system. While this direct
						compilation isolates C executables to the platform they were
						compiled for, it also reduces overhead as no interpreter is needed
						at runtime. With proper compiler optimization, C executables are
						some of the fastest implementations available.
					</p>
					<p>
						The C language's focus on raw performance is not without its cons.
						Like Java, the compiled nature of the language means C is statically
						typed. But unlike Java, programmers must dynamically allocate and
						free memory for the best performance. This approach is necessary for
						the most efficient memory management and system control but hinders
						development as programmers must determine the size of their
						variables and manage their allocation. Dynamic memory allocation
						brings with it its own unique set of potential issues, such as
						losing a pointer to a variable so its memory can never be freed
						(memory leak). C programmers must take great care to efficiently
						allocate and track memory usage throughout a program's runtime to
						avoid these issues and gain the most performance from the language.
					</p>
					<h3>C Performance</h3>
					<pre className="prettyprint">
						#include &#60;stdio.h&#62;<br></br>
						#include &#60;stdlib.h&#62;<br></br>
						#include &#60;time.h&#62;<br></br>
						<br></br>
						int main (int argc, char* argv[]) &#123;<br></br>
						&emsp;&emsp;time_t t;<br></br>
						&emsp;&emsp;srand((unsigned) time(&t));<br></br>
						<br></br>
						&emsp;&emsp;int n = atoi(argv[1]);<br></br>
						&emsp;&emsp;int* vals = malloc(n * sizeof(int));<br></br>
						&emsp;&emsp;for (int i = 0; i &#60; n; i++) &#123;<br></br>
						&emsp;&emsp;&emsp;&emsp;vals[i] = rand() % n;<br></br>
						&emsp;&emsp;&#125;<br></br>
						<br></br>
						&emsp;&emsp;clock_t start = clock();<br></br>
						&emsp;&emsp;for (int i = 0; i &#60; n - 1; i++) &#123;<br></br>
						&emsp;&emsp;&emsp;&emsp;int min_i = i;<br></br>
						&emsp;&emsp;&emsp;&emsp;for (int j = i + 1; j &#60; n; j++) &#123;
						<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;if (vals[j] &#60; vals[min_i])
						&#123;<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;min_i = j;<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&#125;<br></br>
						&emsp;&emsp;&emsp;&emsp;&#125;<br></br>
						&emsp;&emsp;&emsp;&emsp;if (min_i != i) &#123;<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;int tmp = vals[i];<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;vals[i] = vals[min_i];<br></br>
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;vals[min_i] = tmp;<br></br>
						&emsp;&emsp;&emsp;&emsp;&#125;<br></br>
						&emsp;&emsp;&#125;<br></br>
						&emsp;&emsp;printf("%f\n", ((double) (clock() - start)) /
						CLOCKS_PER_SEC);<br></br>
						<br></br>
						&emsp;&emsp;free(vals);<br></br>
						&emsp;&emsp;return 0;<br></br>
						&#125;<br></br>
					</pre>
					<p>
						This is the longest implementation yet of the selection sort
						algorithm. Note the similarities with Java syntax; Java's
						development was influenced by C's popularity at the time of its
						creation. Some notable differences with Java are the use of malloc()
						to dynamically allocate memory for the sorted array and the use of
						format specifiers in printf() to inform the compiler of what data
						type is being printed.
					</p>
					<img
						alt="Graph showing C selection sort execution time."
						src="/lang-compare/images/c-time.png"
					/>
					<p>
						In my testing, the standard unoptimized executables generated from
						the gcc compiler performed no better than Java. This is to be
						expected with such a simple program implemented in two very
						efficient languages. However, optimizing the compiler with the -O3
						flag significantly improved performance beyond the most efficient
						Java code. The best-optimized C program ran about 3.5x faster than
						the comparable Java program, sorting 10,000 items in just a couple
						thousandths of a second.
					</p>
					<h2>Conclusion</h2>
					<img
						alt="Graph showing Python/Java/C selection sort execution time."
						src="/lang-compare/images/python-java-c-time.png"
					/>
					<p>
						In this analysis, we compared the merits of Python, Java, and C,
						highlighting what each language does best. Python is best for rapid
						development, Java is a safe middle-ground without significantly
						compromising development or performance, while C is unrivaled in
						pure performance. As shown in the graph above, compilation has the
						most significant effect on reducing runtime, more so than C's
						dynamic memory allocation.
					</p>
				</main>
			</div>
			<footer>
				<h3>
					Site by{" "}
					<a href="/" rel="noopener noreferrer" target="_blank">
						Sean Eddy
					</a>
				</h3>
			</footer>
		</div>
	);
}
