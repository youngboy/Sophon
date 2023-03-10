'use client'

import { FunctionComponent, useState } from 'react'
import clsx from 'clsx'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import Message from './message'
import Icon from './Icon'
import Table from './table'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  indexAxis: 'y' as const,
  color: 'rgba(206, 212, 218)',
  borderColor: 'rgba(248, 113, 113, 0.3)',
  backgroundColor: 'rgb(248, 113, 113)'
}

type DataMessageProps = {
  plot: {
    metric: string
    data: number[]
    labels: string[]
  }
}

const headers = ['标签', '值']
const DataMessage: FunctionComponent<DataMessageProps> = (props) => {
  const optionList = ['chart', 'sheet']
  const [currentOption, setOption] = useState(optionList[0])
  const chartData = {
    labels: props.plot.labels,
    datasets: [
      {
        label: props.plot.metric,
        data: props.plot.data
      }
    ]
  }
  const tableData = props.plot.labels.map((label, labelIndex) => [
    label,
    props.plot.data[labelIndex]
  ])
  return (
    <Message>
      <div className="px-4 pb-2 flex items-start gap-2">
        <Icon
          xlink="activity"
          className="w-5 h-[24px] min-w-[1.25rem] flex-shrink-0 text-green-600"
        />
        计算结果
        <ToggleGroup.Root
          className="ml-auto"
          type="single"
          value={currentOption}
          onValueChange={(v) => {
            if (v) {
              setOption(v)
            }
          }}
          aria-label="Data message">
          {optionList.map((o) => (
            <ToggleGroup.Item
              key={o}
              className={clsx(
                'p-1 border border-green-600/60 ml-[-1px] rounded-sm first-of-type:rounded-r-none last-of-type:rounded-l-none',
                currentOption == o && 'bg-green-600/20 text-green-600'
              )}
              value={o}
              aria-label={o}>
              <Icon xlink={o} className="w-4" />
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
      <div className="px-4 ">
        <div
          className={clsx({
            hidden: currentOption !== 'chart'
          })}>
          <Bar options={options} data={chartData} />
        </div>
        <Table
          headers={headers}
          data={tableData}
          className={clsx({
            hidden: currentOption !== 'sheet'
          })}
        />
      </div>
    </Message>
  )
}

export default DataMessage
