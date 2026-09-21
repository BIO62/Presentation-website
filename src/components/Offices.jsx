import clsx from 'clsx'

function Office({ name, children, invert = false }) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600'
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({ dict, invert = false, ...props }) {
  const sumong = dict?.offices?.sumong ?? {
    name: 'SUMONG PLAZA',
    address: 'Монгол Улс, Улаанбаатар, БЗД',
    detail: '15-р хороо, Sumong plaza 3 давхар',
  }

  return (
    <ul role="list" {...props}>
      <li>
        <Office name={sumong.name} invert={invert}>
          {sumong.address}
          <br />
          {sumong.detail}
        </Office>
      </li>
    </ul>
  )
}
