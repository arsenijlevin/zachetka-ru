import { AiOutlineClose } from 'react-icons/ai';
import Select from 'react-select'

function ChangeSubjectPopUp() {

  const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]

  return (
    <div className='m-auto w-1/2 flex flex-col border border-grey px-16 py-8'>
      <button className='self-end'>
        <AiOutlineClose onClick={() => console.log("asddas")}/>
        </button>{/*кнопка закрытия*/}
      <div className='flex flex-col gap-5'>
        <div>
            <h4>Выбор семестра</h4>
            <input type='number' className='mt-2 border border-grey'/>{/*Ввыбор семестра*/}
        </div>
        <div>
            <h4>Выбор дисциплины</h4>
            <Select options={options} className='mt-2'/>{/*Выбор дисциплины*/}
        </div>
        <div>
            <h4>Выбор преподавателей</h4>
            <Select isMulti options={options} className='mt-2'/>{/*Выбор преподавателей*/}
        </div>
        <div>
            <h4>Выбор группы</h4>
            <Select isMulti options={options} className='mt-2'/>{/*Выбор группы*/}
        </div>
        <div>
            <h4>Выбор отчётности</h4>
            <Select options={options} className='mt-2'/>{/*Выбор отчётности*/}
        </div>
        <button className='self-center border border-gray px-2 py-1 bg-gray-100'>Применить</button>
      </div>
    </div>
  )
}

export default ChangeSubjectPopUp;
