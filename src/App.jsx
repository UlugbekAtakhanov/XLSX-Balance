import { format } from 'date-fns'
import React, { useState } from 'react'
import { read, utils, writeFile } from 'xlsx'
import DialogDemo from './components/Dialog'

const App = () => {
	const [dataForUI, setDataForUI] = useState([])

	// importing file from xlsx
	const fileHandler = async (e) => {
		const files = e.target.files
		for (const file in files) {
			if (Object.hasOwnProperty.call(files, file)) {
				const element = files[file];
				const fileFromXL = element
				const data = await fileFromXL.arrayBuffer()
				const workbook = read(data)
				const worksheet = workbook.Sheets[workbook.SheetNames[0]]
				const jsonData = utils.sheet_to_json(worksheet)
				console.log(jsonData)
				const newData = jsonData.reduce((acc, current) => {
					const formatedDate = format((new Date(current.Date.split("/").reverse().join("-"))), "dd/MM/yyyy")
					acc = [
						...acc,
						{
							date: formatedDate,
							payee: current.Payee,
							Dr: current.Amount < 0 ? Math.abs(current.Amount) : null,
							Cr: current.Amount > 0 ? current.Amount : null
						}]
					return acc
				}, [])
				setDataForUI(prev => ([...prev, ...newData]))
			}
		}
	}

	// exporting file to xlsx
	const exportHandler = () => {
		const wb = utils.book_new()
		const ws = utils.json_to_sheet(dataForUI)
		utils.book_append_sheet(wb, ws, "Sheet1")
		writeFile(wb, "MyExcel.xlsx")
	}

	return (
		<div className='p-8'>

			<div className='flex items-center justify-between'>
				<input id='file' type="file"
					multiple
					title='You can choose several files'
					onChange={e => fileHandler(e)}
					className='file:bg-transparent file:border file:border-white file:rounded file:text-white file:focus:outline-none file:cursor-pointer file:hover:bg-white/50' />
				<DialogDemo />

			</div>

			<div className='mt-12 flex justify-between items-end'>
				<button onClick={exportHandler} className='border active:scale-95 rounded-md py-1 px-3 text-sm bg-green-500 '>Export to XLSX</button>
				<p className='text-sm underline'>Count: {dataForUI.length}</p>
			</div>

			<table className='w-full mt-4 text-left'>
				<thead>
					<tr>
						<th className='border-b border-white/30'>Date</th>
						<th className='border-b border-white/30'>Payee</th>
						<th className='border-b border-white/30'>Dr</th>
						<th className='border-b border-white/30'>Cr</th>
					</tr>
				</thead>
				<tbody>
					{dataForUI.map((item, index) => (
						<tr key={index} className='[&:nth-child(even)]:bg-slate-500/10 [&:nth-child(even)]:hover:bg-white/20  hover:bg-white/20'>
							<td className='pr-2'>{item.date}</td>
							<td className='pr-2'>{item.payee}</td>
							<td className='text-red-500 pr-2'>{item.Dr}</td>
							<td className='text-green-500'>{item.Cr}</td>
						</tr>
					))}
				</tbody>
			</table>

		</div>
	)
}

export default App