import React, { useEffect, useRef, useState } from "react";
import classes from "./ChatBox.module.css";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ChatBoxAnimation from "../components/ChatBoxAnimation";
import axios from "axios";

interface JobMatch {
  id: string;
  title: string;
  location: string;
  skills: string[];
  salary?: number;
  experience?: string;
  company?: string;
  similarity_score?: number;
}

// interface ChatMessage {
//   role: "user" | "bot";
//   text: string |   JobMatch[];
// }
interface ChatMessage {
  role: "user" | "bot";
  text?: string | JobMatch[] | React.ReactNode;
  botText?: string;
  botSkill?: JobMatch[]
}

const ChatBox: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  console.log("chatHistory:", chatHistory);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  // const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  console.log("chatHistory:", chatHistory);

  function extractJobs(jobString:string) {
    // Check if the message explicitly states no jobs were found
    if (/No matching job postings were found\./.test(jobString)) {
      return []; // Return an empty array if no jobs are found
    }
  
    // Define the two regex patterns
    const regexPatterns = [
      /Job #\d+:\s+- ID:\s+(\d+)\s+- Title:\s+(.+?)\s+- Location:\s+(.+?)\s+- Skills:\s+(.+?)\s+- Salary:\s+([\d.]+)\s+- Experience:\s+(.+?)\s+- Company:\s+(.+?)(?:\n-+|\n----------------------------------------------------)?/gs,
      /Job #\d+:\n-+\n- ID:\s+(\d+)\n- Title:\s+(.+?)\n- Location:\s+(.+?)\n- Skills:\s+(.+?)\n- Salary:\s+([\d.]+)\n- Experience:\s+(.+?)\n- Company:\s+(.+?)(?:\n-+|$)/gs,
    ];
  
    const jobs = [];
  
    // Try each regex pattern
    for (const jobRegex of regexPatterns) {
      let match;
  
      // Execute the regex and collect matches
      while ((match = jobRegex.exec(jobString)) !== null) {
        jobs.push({
          id: match[1],
          title: match[2],
          location: match[3],
          skills: match[4].split(', ').map(skill => skill.trim()),
          salary: parseFloat(match[5]),
          experience: match[6],
          company: match[7],
        });
      }
  
      // If we find matches, stop trying other patterns
      if (jobs.length > 0) break;
    }
  
    return jobs;
  }
  
  function extractText(message:string) {
    // Regex to extract the header/general text before jobs
    const textRegex = /^(.+?)\n\n(?:Job #|\-+|\nNo matching job postings were found)/s;
    const textMatch = message.match(textRegex);
    const text = textMatch ? textMatch[1].trim() : '';
    return text;
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const generateBotResponse = (latestMessage: ChatMessage) => {
    // Hiển thị tin nhắn "Bot is typing..."
    setIsLoading(true);
    setChatHistory((prev) => [
      ...prev,
      { role: "bot", text: "Bot is typing..." },
    ]);

    const formattedMessage = {
      type: latestMessage.role === "user" ? "human" : "bot",
      content: latestMessage.text,
    };

    // Gửi tin nhắn mới nhất đến API
    fetch(
      "https://566f-2404-e801-2007-a3e-e561-2024-4d0b-d404.ngrok-free.app/invoke",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            messages: [formattedMessage],
          },
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bot response");
        }
        return response.json();
      })
      .then((data) => {
        const botResponse = data.output;

        const botText = extractText(botResponse)
        const botSkillList = extractJobs(botResponse)
        console.log(botText);

        // Xóa tin nhắn "Bot is typing..."
        setChatHistory((prev) =>
          prev.filter((message) => message.text !== "Bot is typing...")
        );

        // Thêm phản hồi thực sự từ bot
        setChatHistory((prev) => [
          ...prev,
          {
            role: "bot",
            // text: botResponse,
            botText: botSkillList.length > 0 ? botText : "Found 0 job that match your requirement",
            botSkill: botSkillList.length > 0 ? botSkillList : []
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching bot response:", error);
        setChatHistory((prev) =>
          prev.filter((message) => message.text !== "Bot is typing...")
        );
      })
      .finally(() => {
        setIsLoading(false); // Tắt trạng thái loading
      });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = inputRef?.current?.value.trim();
    if (!userMessage) return;
    inputRef.current!.value = "";
    // Add user message to chat history
    // setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);
    // setTimeout(() => {
    //   // Add bot response to chat history
    //   setChatHistory((prev) => [
    //     ...prev,
    //     {
    //       role: "bot",
    //       text: "I'm sorry, I'm a bot. I can't help you with that.",
    //     },
    //   ]);
    // }, 1000);
    //call function to generate bot response
    const newMessage: ChatMessage = { role: "user", text: userMessage };
    // setSelectedFileName(null);
    // generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
    setChatHistory((prev) => [...prev, newMessage]);
    generateBotResponse(newMessage);
  };

  useEffect(() => {
    // Gửi tin nhắn đầu tiên cho bot khi trang được tải
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);


  const handleUploadCV = async (): Promise<void> => {
    try {
      const inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.accept = ".pdf";

      inputElement.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];

        if (!file) {
          console.error("No file selected");
          return;
        }


        const fileDownloadURL = URL.createObjectURL(file);

        // Add the uploaded file as a downloadable link in the chat
        const newMessage: ChatMessage = {
          role: "user",
          text: (
            <a
              href={fileDownloadURL}
              download={file.name}
              style={{ color: "#3cbc8c", textDecoration: "underline" }}
            >
              {file.name}
            </a>
          ),
        };

        setChatHistory((prev) => [...prev, newMessage]);

        // Thêm trạng thái "Bot is typing..."
        setChatHistory((prev) => [
          ...prev,
          { role: "bot", text: "Bot is typing..." },
        ]);

        // Tạo FormData và thêm tệp đã chọn
        const formData = new FormData();
        formData.append("file", file);

        try {
          // Gửi file đến API upload
          const uploadResponse = await axios.post(
            "https://fb32-112-197-86-203.ngrok-free.app/upload_and_process",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("CV uploaded successfully:", uploadResponse.data);

          // Extract thông tin cần thiết từ phản hồi
          const { data, file_info, parser_used, message } = uploadResponse.data;

          // Chuẩn bị payload cho API compare
          const compareCVPayload = {
            status: "success",
            data,
            file_info,
            parser_used,
            message,
          };

          try {
            // Gửi payload đến API compare
            const compareResponse = await axios.post(
              "https://566f-2404-e801-2007-a3e-e561-2024-4d0b-d404.ngrok-free.app/compare-cv",
              compareCVPayload,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("Comparison result:", compareResponse.data);

            // Xóa trạng thái "Bot is typing..."
            setChatHistory((prev) =>
              prev.filter((message) => message.text !== "Bot is typing...")
            );

            // Thêm phản hồi từ API compare vào lịch sử chat
            const jobMatches = compareResponse.data.matches;
            setChatHistory((prev) => [
              ...prev,
              {
                role: "bot",
                text: jobMatches,
              },
            ]);
          } catch (compareError) {
            console.error("Error comparing CV:", compareError);

            // Xóa trạng thái "Bot is typing..." nếu có lỗi
            setChatHistory((prev) =>
              prev.filter((message) => message.text !== "Bot is typing...")
            );
          }
        } catch (uploadError) {
          console.error("Error uploading CV:", uploadError);

          // Xóa trạng thái "Bot is typing..." nếu có lỗi
          setChatHistory((prev) =>
            prev.filter((message) => message.text !== "Bot is typing...")
          );
        }
      };

      // Kích hoạt hộp thoại chọn file
      inputElement.click();
    } catch (error) {
      console.error("Error initializing upload:", error);

      // Xóa trạng thái "Bot is typing..." nếu có lỗi
      setChatHistory((prev) =>
        prev.filter((message) => message.text !== "Bot is typing...")
      );
    }
  };


  return (
    <div className={classes.main}>
      <div className={classes.left}>
        <nav className={classes.nav}>
          <div className={classes.main1}>
            <span className={classes.span}>
              <Link to="/" style={{ textDecoration: "none" }}>
                {" "}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center", // Căn giữa theo chiều dọc
                  }}
                >
                  {/* Phần chữ "it" */}
                  <Box
                    sx={{
                      backgroundColor: "#3cbc8c",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "22px",
                      fontFamily: "Lexend, sans-serif",
                      lineHeight: "1",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "3px",
                    }}
                  >
                    A
                  </Box>

                  <Typography
                    variant="h2"
                    sx={{
                      color: "#000000",
                      fontWeight: 700,
                      fontSize: "22px",
                      fontFamily: "Lexend, sans-serif",
                      lineHeight: "1.5",
                    }}
                  >
                    mazingJob
                  </Typography>
                </Box>
              </Link>
            </span>
          </div>
          <div className={classes.main2}>
            <div className={classes.main3}>
              <span className={classes.span1}>
                <div className={classes.a}>
                  <svg className={classes.svg}>
                    <circle cx={11} cy={11} r={8}></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <span className={classes.span2}>
                    I want to find react in Hồ Chí Minh
                  </span>
                </div>
              </span>
            </div>
          </div>
        </nav>
      </div>
      <div className={classes.right}>
        <div className={classes.main4}>
          <div className={classes.main5}>
            <div className={classes.main6}>
              {chatHistory.length === 0 ? (
                <div className={classes.main7}>
                  <div className={classes.main8}>
                    <div className={classes.main9}>
                      <div className={classes.main10}>
                        <Typography
                          variant="h1"
                          sx={{
                            fontSize: "1.5rem",
                            lineHeight: "2rem",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            fontFamily: "Lexend, sans-serif",
                            textAlign: "center",
                            overflow: "hidden",
                            fontWeight: "bold",
                          }}
                        >
                          {"Hi ! Find Your Next Job Here"}
                          <div className={classes.main11}></div>
                        </Typography>
                      </div>
                      <div className={classes.mainlogo}>
                        <div className={classes.mainlogo1}>
                          <div className={classes.mainlogo2}>
                            <ChatBoxAnimation />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={classes.main30}>
                  <div className={classes.main31}>
                    <div className={classes.main32}>
                      <div className={classes.main33}>
                        <div className={classes.main34}>
                          <div className={classes.main35}>
                            <div className={classes.main36}>
                              {chatHistory.map((message, index) =>
                                message.role === "user" ? (
                                  <article
                                    key={index}
                                    className={
                                      message.role === "user"
                                        ? classes.userarticle
                                        : classes.botarticle
                                    }
                                  >
                                    <div className={classes.main37}>
                                      <div className={classes.main38}>
                                        <div className={classes.main39}>
                                          <div className={classes.main40}>
                                            <div className={classes.main41}>
                                              <div className={classes.main42}>
                                                {typeof message.text ===
                                                  "string"
                                                  ? message.text
                                                  : React.isValidElement(
                                                    message.text
                                                  )
                                                    ? message.text
                                                    : ""}

                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </article>
                                ) : (
                                  <article
                                    key={index}
                                    className={classes.botarticle}
                                  >
                                    <div className={classes.main44}>
                                      <div className={classes.main45}>
                                        <div className={classes.logobot}>
                                          <div className={classes.main46}>
                                            <Box
                                              sx={{
                                                backgroundColor: "#3cbc8c",
                                                color: "#fff",
                                                fontWeight: 700,
                                                fontSize: "22px",
                                                fontFamily:
                                                  "Lexend, sans-serif",
                                                lineHeight: "1",
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginRight: "3px",
                                              }}
                                            >
                                              A
                                            </Box>
                                          </div>
                                        </div>
                                        {typeof message.text === "string" ? (
                                          <div className={classes.main47}>
                                            <div className={classes.main48}>
                                              <div className={classes.main49}>
                                                <p className={classes.p}>
                                                  {message.text}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        ) : Array.isArray(message.text) ? (
                                          <div className={classes.mainjob}>
                                            <div className={classes.mainjob1}>
                                              <div className={classes.mainjob2}>
                                                <div
                                                  className={classes.mainjob3}
                                                >
                                                  <div
                                                    className={classes.mainjob4}
                                                  >
                                                    <div
                                                      className={
                                                        classes.mainjob5
                                                      }
                                                    >
                                                      <div
                                                        className={
                                                          classes.mainjob6
                                                        }
                                                      >
                                                        {message.text.map(
                                                          (job) => (
                                                            <div
                                                              key={job.id}
                                                              className={
                                                                classes.mainjob7
                                                              }
                                                            >
                                                              <div
                                                                className={
                                                                  classes.mainjob8
                                                                }
                                                              >
                                                                <div
                                                                  className={
                                                                    classes.mainjob9
                                                                  }
                                                                >
                                                                  <div>
                                                                    <Typography
                                                                      variant="h3"
                                                                      sx={{
                                                                        color:
                                                                          "#fafafa",
                                                                        letterSpacing:
                                                                          "-.025em",
                                                                        fontWeight: 600,
                                                                        fontsize:
                                                                          "1rem",
                                                                        lineHeight:
                                                                          "1.75rem",
                                                                        margin:
                                                                          "0",
                                                                      }}
                                                                    >
                                                                      {
                                                                        job.title
                                                                      }
                                                                    </Typography>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div
                                                                className={
                                                                  classes.mainjob10
                                                                }
                                                              >
                                                                <p
                                                                  className={
                                                                    classes.mainjob12
                                                                  }
                                                                >
                                                                  <strong
                                                                    style={{
                                                                      fontWeight:
                                                                        "bold",
                                                                      color:
                                                                        "#fff",
                                                                    }}
                                                                  >
                                                                    Locations:{" "}
                                                                  </strong>
                                                                  {job.location}
                                                                </p>
                                                                <p
                                                                  className={
                                                                    classes.mainjob12
                                                                  }
                                                                >
                                                                  <strong
                                                                    style={{
                                                                      fontWeight:
                                                                        "bold",
                                                                      color:
                                                                        "#fff",
                                                                    }}
                                                                  >
                                                                    Experiecne:{" "}
                                                                  </strong>
                                                                  {
                                                                    job.experience
                                                                  }
                                                                </p>
                                                                <p
                                                                  className={
                                                                    classes.mainjob13
                                                                  }
                                                                  style={{
                                                                    color:
                                                                      "#fff",
                                                                  }}
                                                                >
                                                                  <strong>
                                                                    Skills:
                                                                  </strong>
                                                                  <span
                                                                    className={
                                                                      classes.spanskill
                                                                    }
                                                                  >
                                                                    {job.skills.map(
                                                                      (
                                                                        skill,
                                                                        index
                                                                      ) => (
                                                                        <span
                                                                          className={
                                                                            classes.spanskill1
                                                                          }
                                                                          key={
                                                                            index
                                                                          }
                                                                        >
                                                                          {
                                                                            skill
                                                                          }
                                                                        </span>
                                                                      )
                                                                    )}
                                                                  </span>
                                                                </p>
                                                                <p
                                                                  className={
                                                                    classes.mainjob12
                                                                  }
                                                                >
                                                                  <strong
                                                                    style={{
                                                                      fontWeight:
                                                                        "bold",
                                                                      color:
                                                                        "#fff",
                                                                    }}
                                                                  >
                                                                    Similarity:{" "}
                                                                  </strong>
                                                                  {job.similarity_score && (
                                                                    <p
                                                                      className={
                                                                        classes.mainjob12
                                                                      }
                                                                    >
                                                                      {(
                                                                        job.similarity_score *
                                                                        100
                                                                      ).toFixed(
                                                                        2
                                                                      )}
                                                                      %
                                                                    </p>
                                                                  )}
                                                                </p>
                                                              </div>
                                                            </div>
                                                          )
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          message?.botSkill!.length > 0 ? (<div className={classes.mainjob}>
                                            <div className={classes.mainjob1}>
                                              <div className={classes.mainjob2}>
                                                <div
                                                  className={classes.mainjob3}
                                                >
                                                  <div
                                                    className={classes.mainjob4}
                                                  >
                                                    <div
                                                      className={
                                                        classes.mainjob5
                                                      }
                                                    >
                                                      <div
                                                        className={
                                                          classes.mainjob6
                                                        }
                                                      >
                                                        ({message?.botText ? message?.botText : ""})
                                                        {message!.botSkill?.map(
                                                          (job) => (
                                                            <div
                                                              key={job.id}
                                                              className={
                                                                classes.mainjob7
                                                              }
                                                            >
                                                              <div
                                                                className={
                                                                  classes.mainjob8
                                                                }
                                                              >
                                                                <div
                                                                  className={
                                                                    classes.mainjob9
                                                                  }
                                                                >
                                                                  <div>
                                                                    <Typography
                                                                      variant="h3"
                                                                      sx={{
                                                                        color:
                                                                          "#fafafa",
                                                                        letterSpacing:
                                                                          "-.025em",
                                                                        fontWeight: 600,
                                                                        fontsize:
                                                                          "1rem",
                                                                        lineHeight:
                                                                          "1.75rem",
                                                                        margin:
                                                                          "0",
                                                                      }}
                                                                    >
                                                                      <div onClick={()=> {
                                                                        window.open(`https://jobsearch-zeta-nine.vercel.app/jobs/detail/7`);
                                                                      }}>  {
                                                                        job.title
                                                                      }</div>
                                                                    
                                                                    </Typography>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div
                                                                className={
                                                                  classes.mainjob10
                                                                }
                                                              >
                                                                <p
                                                                  className={
                                                                    classes.mainjob12
                                                                  }
                                                                >
                                                                  <strong
                                                                    style={{
                                                                      fontWeight:
                                                                        "bold",
                                                                      color:
                                                                        "#fff",
                                                                    }}
                                                                  >
                                                                    Locations:{" "}
                                                                  </strong>
                                                                  {job.location}
                                                                </p>
                                                                <p
                                                                  className={
                                                                    classes.mainjob12
                                                                  }
                                                                >
                                                                  <strong
                                                                    style={{
                                                                      fontWeight:
                                                                        "bold",
                                                                      color:
                                                                        "#fff",
                                                                    }}
                                                                  >
                                                                    Experiecne:{" "}
                                                                  </strong>
                                                                  {
                                                                    job.experience
                                                                  }
                                                                </p>
                                                                <p
                                                                  className={
                                                                    classes.mainjob13
                                                                  }
                                                                  style={{
                                                                    color:
                                                                      "#fff",
                                                                  }}
                                                                >
                                                                  <strong>
                                                                    Skills:
                                                                  </strong>
                                                                  <span
                                                                    className={
                                                                      classes.spanskill
                                                                    }
                                                                  >
                                                                    {job.skills.map(
                                                                      (
                                                                        skill,
                                                                        index
                                                                      ) => (
                                                                        <span
                                                                          className={
                                                                            classes.spanskill1
                                                                          }
                                                                          key={
                                                                            index
                                                                          }
                                                                        >
                                                                          {
                                                                            skill
                                                                          }
                                                                        </span>
                                                                      )
                                                                    )}
                                                                  </span>
                                                                </p>
                                                                <p
                                                                  className={
                                                                    classes.mainjob12
                                                                  }
                                                                >
                                                                  <strong
                                                                    style={{
                                                                      fontWeight:
                                                                        "bold",
                                                                      color:
                                                                        "#fff",
                                                                    }}
                                                                  >
                                                                    Similarity:{" "}
                                                                  </strong>
                                                                  {job.similarity_score && (
                                                                    <p
                                                                      className={
                                                                        classes.mainjob12
                                                                      }
                                                                    >
                                                                      {(
                                                                        job.similarity_score *
                                                                        100
                                                                      ).toFixed(
                                                                        2
                                                                      )}
                                                                      %
                                                                    </p>
                                                                  )}
                                                                </p>
                                                              </div>
                                                            </div>
                                                          )
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>) : (message?.botText ? (message?.botText) : (""))
                                        )}
                                        {/* <div className={classes.main47}>
                                            <div className={classes.main48}>
                                              <div className={classes.main49}>
                                                <p className={classes.p}>
                                                  {message.text}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                      */}
                                      </div>
                                    </div>
                                  </article>
                                )
                              )}
                              {/* <article className={classes.article}>
                              <div className={classes.main37}>
                                <div className={classes.main38}>
                                  <div className={classes.main39}>
                                    <div className={classes.main40}>
                                      <div className={classes.main41}>
                                        <div className={classes.main42}>
                                          xin chào
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </article> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className={classes.main12}>
                <div className={classes.main13}>
                  <div className={classes.main14}>
                    <div className={classes.main15}>
                      <div className={classes.main16}>
                        {/* <button className={classes.button}>
                          <div className={classes.main17}>Find Job by Role</div>
                          <div className={classes.main18}>
                            Explore openings by job title
                          </div>
                        </button> */}
                        <button
                          onClick={() => handleUploadCV()}
                          className={classes.button}
                          style={{ cursor: "pointer" }}
                        >
                          <div className={classes.main17}>
                            Find Job by Using Your resume
                          </div>
                          <div className={classes.main18}>
                            Get pesonalized job matches
                          </div>
                        </button>
                      </div>
                      <div className={classes.main19}>
                        <div className={classes.main20}>
                          <form
                            action=""
                            className={classes.form}
                            onSubmit={handleSendMessage}
                          >
                            <div className={classes.main21}>
                              <div></div>
                              <div className={classes.main23}>
                                <div className={classes.main24}>
                                  <div className={classes.main25}>
                                    <div className={classes.main26}>
                                      <div className={classes.main27}>
                                        <textarea
                                          name=""
                                          id=""
                                          placeholder="send a message"
                                          spellCheck="false"
                                          className={classes.inputtextarea}
                                          ref={inputRef}
                                        ></textarea>
                                      </div>
                                    </div>
                                    {isLoading ? (
                                      <button
                                        className={classes.span3}
                                        role="button"
                                        disabled
                                      // type="submit"
                                      >
                                        Waiting
                                      </button>
                                    ) : (
                                      <button
                                        className={classes.span3}
                                        role="button"
                                        type="submit"
                                      >
                                        Send
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
