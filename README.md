## Website Performance Optimization Portfolio Project

This repository contains a _src_ directory with source files and a _dist_ folder with production files. Gulp was used to automate the following tasks:

* Minify js, css, and HTML files using the _uglify_, _minifyCSS_, and _htmlmin_ plugins
* Update js and css links with the extension .min using the _useref_ plugin
* Optimize images using the _imagemin_ plugin
* Run a live server using the _browser-sync_ plugin
* Clean the "dist" folder using the _del_ plugin
* Build a sequence of tasks that clean the **dist** folder, minifies files, optimize images, and creates a new dist folder back using the _runSequence_ plugin.

Use the following steps to run the Mobile Portfolio web site:
1. Clone or download the folder by copying the link on the top right corner (green button) and paste it in your terminal using Git. Instructions about how to use Git and how to clone a repository are found [here](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/).
2. Navigate to the folder location using ```$ cd /path/to/your-project-folder```
4. Run ```$ npm install --global gulp-cli``` this will install _gulp_ globally
5. Run ```$ npm install```
3. Type ```$ gulp``` to run the production and optimized website in your browser

If you would like to make changes to the source files, type ```$ gulp build``` to minify, optimize, and create a new "dist" folder with the updated files.

### Website Optimizations

#### Part 1: index.html Optimizations

* Inlined CSS and used media="print" query attribute to avoid block rendering
* Moved javaScript files at the bottom of the page and added the 'async' attribute to avoid render-blocking from js resources and execute after over-the-fold DOM elements are loaded.
* Minified the HTML file into the production folder to improve speed load

#### Part 2: Frames per Second optimizations for pizza.html

The following modifications were done to the main.js file:
* Used "will-change: transform" to promote the "movers" class into its own layer to reduce paint time.
* Used **translateX** transform property to prevent triggering layout.
* Improved the **changePizzaSizes** function by eliminating the determineDx variable and repeated code. Simplified the for loop to eliminate FSL (according to cameron's video instructions).
* Changed all **querySelectorAll** attributes for **getElementsByClassName** to avoid unnecessary queries to all DOM elements
* Cached values by setting _array.length_ with a new var inside the loop's initialization to prevent the length value from being checked on each loop's iteration.
* Moved some methods such as **document.getElementById** out of functions and loops to avoid multiple queries on each loop's iteration since they are needed to run only once when the DOM loads.
* Moved calculations outside the for loop in the **updatePositions** function.
* Used **requestAninationFrame** to optimize animation inside scroll events
* Moved all calculations outside the for loop in the **document.addEventListener** function and created a function that generates the sliding pizza object.

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>
