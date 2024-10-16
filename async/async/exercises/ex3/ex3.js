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

function getFile(file) {
	return new Promise((resolve) => {
		fakeAjax(file, (text) => {
			resolve(text);
		})
	})
}

// Same as above function, resolve is just passed in, into fakeAjax instead (one less call)
// function getFile(file) {
// 	return new Promise((resolve) => {
// 		fakeAjax(file, resolve)
// 	})
// }

// request all files at once in "parallel"
// ???


async function getPromisesOrderly(...promises) {
	for (let promise of promises) {
		output(await promise)
	}
}


getPromisesOrderly(getFile("file1"), getFile("file2"), getFile("file3")).then(() => {
	console.log("completed")
});
