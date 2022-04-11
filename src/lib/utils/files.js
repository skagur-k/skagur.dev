import fs from 'fs'
import path from 'path'

// Pipes an array of functions from left to right with x as initial input
const pipe =
	(...fns) =>
	(x) =>
		fns.reduce((v, f) => f(v), x)

// flattens x-Dimensional array into 1D array
const flattenArray = (input) =>
	input.reduce(
		(acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])],
		[]
	)

const map = (fn) => (input) => input.map(fn)

const walkDir = (fullPath) => {
	return fs.statSync(fullPath).isFile()
		? fullPath
		: getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = (prefix) => (extraPath) => path.join(prefix, extraPath)

const getAllFilesRecursively = (folder) => {
	return pipe(
		fs.readdirSync, // reads the files in the folder
		map(pipe(pathJoinPrefix(folder), walkDir)), // for each file/folder, join
		flattenArray
	)(folder)
}

export default getAllFilesRecursively
