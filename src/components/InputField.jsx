import { useRef, forwardRef, useImperativeHandle } from 'react';

const InputField = forwardRef(({ className, ...props }, ref) => {
   const { defaultValues, setInputValues } = props;

   const dateInputRef = useRef();
   const titleInputRef = useRef();
   const expenseInputRef = useRef();
   const descriptionInputRef = useRef();

   useImperativeHandle(ref, () => ({
      reset: resetInputFields,
   }));

   function handleInputFieldsChange() {
      const changedInputValues = {
         date: getRefValue(dateInputRef),
         title: getRefValue(titleInputRef),
         expense: +getRefValue(expenseInputRef),
         description: getRefValue(descriptionInputRef),
      };
      setInputValues(changedInputValues);
   }

   function resetInputFields() {
      const todayYYYYMMDD = new Date().toISOString().slice(0, 10);
      setRefValue(dateInputRef, todayYYYYMMDD);
      setRefValue(titleInputRef, '');
      setRefValue(expenseInputRef, '');
      setRefValue(descriptionInputRef, '');
   }

   return (
      <div className={className} onChange={handleInputFieldsChange}>
         <label> 날짜 </label>
         <input
            type='date'
            ref={dateInputRef}
            defaultValue={defaultValues?.date}
         />
         <label> 항목 </label>
         <input
            type='text'
            ref={titleInputRef}
            defaultValue={defaultValues?.title}
         />
         <label> 금액 </label>
         <input
            type='number'
            ref={expenseInputRef}
            defaultValue={defaultValues?.expense}
         />
         <label> 내용 </label>
         <input
            type='text'
            ref={descriptionInputRef}
            defaultValue={defaultValues?.description}
         />
      </div>
   );
});

/******************
   유틸리티 함수  
******************/
function setRefValue(ref, value) {
   ref.current.value = value;
}

function getRefValue(ref) {
   return ref.current.value;
}

export default InputField;
