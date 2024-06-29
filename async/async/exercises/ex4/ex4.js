function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???


// Destructured from below but not firing the promise first
// Promise.resolve()
// .then(() => getFile("file1"))
// .then(output)
// .then(() => getFile("file2"))
// .then(output)
// .then(() => getFile("file3"))
// .then(output)


// ["file1", "file2", "file3"]
// .map(getFile)
// .reduce((accumulator, currentValue) => accumulator.then(() => currentValue)
// 												  .then(output), 
// 		Promise.resolve())



function printFiles(...promises) {
	promises
	.map(getFile)
	.reduce((accumulator, currentValue) => accumulator.then(() => currentValue)
													  .then(output), 
			Promise.resolve())
}

printFiles("file1", "file2", "file3");