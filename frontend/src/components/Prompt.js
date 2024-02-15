import React, { useState, useEffect } from "react";
import { useCandidate } from "../context/Context";
import axios from "axios";

import PromptInput from "./PromptInput";

const Prompt = () => {
  const {
    dataToInfer,
    setDataInfer,
    savedPrompts,
    setAgePromptInputs,
    setLanguagePromptInputs,
    setLocationPromptInputs,
    agePrompts,
    languagePrompts,
    locationPrompts,
    setSavedPromptsData,
  } = useCandidate();

  const [unsavedAgePrompts, setUnsavedAgePrompts] = useState([]);
  const [unsavedLangPrompts, setUnsavedLangPrompts] = useState([]);
  const [unsavedLocPrompts, setUnsavedLocPrompts] = useState([]);

  const handleOnChange = async (event) => {
    const val = event.target.value;
    await setDataInfer(val);
  };

  useEffect(() => {
    const loadSavedPrompts = async (dataInfer, i) => {
      try {
        const response = await axios.post(`/get_prompt/${i}`, {
          dataToInfer: dataInfer,
        });
        return response.data.prompt;
      } catch (err) {
        console.log(err);
      }
    };

    const loadPromptData = async () => {
      try {
        const response = await axios.post("/load_prompt", {
          dataToInfer: null,
        });

        if (response.data) {
          await setSavedPromptsData(response.data);
          if (dataToInfer === "age") {
            const agePromptsArray = await Promise.all(
              Array.from({ length: savedPrompts["age"] }, async (_, i) => {
                const dataPrompt = await loadSavedPrompts(dataToInfer, i + 1);
                return (
                  <PromptInput
                    id={i + 1}
                    key={`age${i + 1}`}
                    prompt={dataPrompt}
                  />
                );
              })
            );
            setAgePromptInputs(agePromptsArray);
          } else if (dataToInfer === "languageSkills") {
            const langPromptsArray = await Promise.all(
              Array.from(
                { length: savedPrompts["languageSkills"] },
                async (_, i) => {
                  const dataPrompt = await loadSavedPrompts(dataToInfer, i + 1);
                  return (
                    <PromptInput
                      id={i + 1}
                      key={`lang${i + 1}`}
                      prompt={dataPrompt}
                    />
                  );
                }
              )
            );
            setLanguagePromptInputs(langPromptsArray);
          } else if (dataToInfer === "location") {
            const locPromptsArray = await Promise.all(
              Array.from({ length: savedPrompts["location"] }, async (_, i) => {
                const dataPrompt = await loadSavedPrompts(dataToInfer, i + 1);
                return (
                  <PromptInput
                    id={i + 1}
                    key={`loc${i + 1}`}
                    prompt={dataPrompt}
                  />
                );
              })
            );
            setLocationPromptInputs(locPromptsArray);
          }
        }
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    };

    loadPromptData();
  }, [dataToInfer]);

  const addPromptInput = () => {
    if (dataToInfer === "age") {
      const newIndex = unsavedAgePrompts.length;
      setUnsavedAgePrompts([...unsavedAgePrompts, <PromptInput key={newIndex} index={newIndex} onDelete={deleteUnsavedPrompt} />]);
    } else if (dataToInfer === "languageSkills") {
      const newIndex = unsavedLangPrompts.length;
      setUnsavedLangPrompts([...unsavedLangPrompts, <PromptInput key={newIndex} index={newIndex} onDelete={deleteUnsavedPrompt} />]);
    } else if (dataToInfer === "location") {
      const newIndex = unsavedLocPrompts.length;
      setUnsavedLocPrompts([...unsavedLocPrompts, <PromptInput key={newIndex} index={newIndex} onDelete={deleteUnsavedPrompt} />]);
    }
  };

  const deleteUnsavedPrompt = (index) => {
    if (dataToInfer === "age") {
      setUnsavedAgePrompts(unsavedAgePrompts.filter((_, i) => i !== index));
    } else if (dataToInfer === "languageSkills") {
      setUnsavedLangPrompts(unsavedLangPrompts.filter((_, i) => i !== index));
    } else if (dataToInfer === "location") {
      setUnsavedLocPrompts(unsavedLocPrompts.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-[#F5F5F5] p-6 flex flex-col justify-start w-[37.5%] gap-6 no-scrollbar overflow-scroll max-h-[145vh]  min-h-[145vh] ">
      <div className="mt-10 flex flex-col gap-6">
        <div className="flex justify-between gap-5 items-center">
          <h1 className="text-3xl font-bold">Prompt</h1>
          <div>
            <select
              className="border border-[#ababab] border-dashed text-[#ababab] text-center hover:border-black hover:text-black hover:cursor-pointer p-1"
              value={dataToInfer}
              defaultValue="age"
              onChange={handleOnChange}
            >
              <option value="" disabled selected>
                Select a data to infer
              </option>
              <option value="age">Age</option>
              <option value="languageSkills">Language Skills EN</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={addPromptInput}
            className="border border-[#ababab] border-dashed text-[#ababab] bg-[#F5F5F5] w-full rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
          >
            <i className="fa-solid fa-plus"></i> Add a new prompt
          </button>
        </div>
        <div>
          {dataToInfer === "age" && (
            <div>
              {agePrompts.map((prompt, index) => (
                <div key={index}>{prompt}</div>
              ))}
              {unsavedAgePrompts.map((prompt, index) => (
                <div key={index}>{prompt}</div>
              ))}
            </div>
          )}

          {dataToInfer === "languageSkills" && (
            <div>
              {languagePrompts.map((prompt, index) => (
                <div key={index}>{prompt}</div>
              ))}
              {unsavedLangPrompts.map((prompt, index) => (
                <div key={index}>{prompt}</div>
              ))}
            </div>
          )}
          {dataToInfer === "location" && (
            <div>
              {locationPrompts.map((prompt, index) => (
                <div key={index}>{prompt}</div>
              ))}
              {unsavedLocPrompts.map((prompt, index) => (
                <div key={index}>{prompt}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prompt;
