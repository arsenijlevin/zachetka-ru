import { AiOutlineClose } from 'react-icons/ai';
import Select from 'react-select'

function ChangeSubjectPopUp() {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

  return (
    <div>
      <AiOutlineClose/>{/*кнопка закрытия*/}
      <div>
        <div>
            <h4>Выбор семестра</h4>
            <input type='number'/>{/*Ввыбор семестра*/}
        </div>
        <div>
            <h4>Выбор дисциплины</h4>
            <Select options={options}/>{/*Выбор дисциплины*/}
        </div>
        <div>
            <h4>Выбор преподавателей</h4>
            <Select isMulti options={options}/>{/*Выбор преподавателей*/}
        </div>
        <div>
            <h4>Выбор группы</h4>
            <Select isMulti options={options}/>{/*Выбор группы*/}
        </div>
        <div>
            <h4>Выбор отчётности</h4>
            <Select options={options}/>{/*Выбор отчётности*/}
        </div>
        <button>Применить</button>
      </div>
    </div>
  )
}

export default ChangeSubjectPopUp;
