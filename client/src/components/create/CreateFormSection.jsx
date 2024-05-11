import Input from "../common/Input";
import ImgUploader from "../common/imgUploader/ImgUploader";
import * as S from "./CreateFormSection.styled";
import TipSection from "./funding/TipSection";
import RadioGroup from "../common/RadioGroup";
import { MATERIAL_OPTIONS } from "../../datas/options";
import { blockTextInput } from "../../utils/transformInputValue";
import TextArea from "../common/TextArea";

const CreateFormSection = ({ errMsg, onChange, description, ...att }) => {
  //날짜 최소 최대 값 변수
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 100);
  const formattedMaxDate = maxDate.toISOString().split("T")[0];

  const inputComponents = {
    title: (
      <Input {...att} variant="outline" maxLength="40" onChange={onChange} />
    ),
    thumbNailImage: <ImgUploader onChange={onChange} {...att} />,
    content: (
      <TextArea {...att} maxLength="500" boxSize="14rem" onChange={onChange} />
    ),
    materialType: (
      <RadioGroup
        {...att}
        name="categoryId"
        options={MATERIAL_OPTIONS}
        onChange={onChange}
      />
    ),
    totalQuantity: (
      <Input
        {...att}
        variant="outline"
        onInput={blockTextInput}
        onChange={onChange}
      />
    ),
    deadline: (
      <Input
        {...att}
        variant="outline"
        type="date"
        min={minDate}
        max={formattedMaxDate}
        onChange={onChange}
      />
    ), // store

    material: (
      <TextArea {...att} maxLength="100" boxSize="5rem" onChange={onChange} />
    ),
    price: (
      <Input
        {...att}
        variant="outline"
        onInput={blockTextInput}
        onChange={onChange}
      />
    ),
    contentImage: <ImgUploader {...att} onChange={onChange} />,
  };

  return (
    <S.FormSectionContainer>
      <S.InputSection>
        <label className="input-label">
          {att.title}
          <span>*</span>
        </label>

        {inputComponents[att.name]}

        <p className="err-msg">{errMsg}</p>
      </S.InputSection>

      {description && <TipSection>{description}</TipSection>}
    </S.FormSectionContainer>
  );
};

export default CreateFormSection;
