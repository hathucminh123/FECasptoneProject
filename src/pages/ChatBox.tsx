import React, { useEffect, useRef, useState } from "react";
import classes from "./ChatBox.module.css";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ChatBoxAnimation from "../components/ChatBoxAnimation";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}
const ChatBox: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  //   const generateBotResponse = (history: ChatMessage[]) => {
  //     // Chuyển đổi lịch sử tin nhắn thành định dạng API yêu cầu
  //     const formattedHistory = history.map(({ role, text }) => ({
  //       type: role === "user" ? "human" : "bot",
  //       content: text,
  //     }));

  //     fetch("https://566f-2404-e801-2007-a3e-e561-2024-4d0b-d404.ngrok-free.app/invoke", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         input: {
  //           messages: formattedHistory,
  //         },
  //       }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch bot response");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // Lấy phản hồi của bot từ API
  //         const botResponse = data.output;
  //         console.log("Bot response:", botResponse);

  //         // Cập nhật lịch sử trò chuyện với phản hồi của bot
  //         setChatHistory((prev) => [
  //           ...prev,
  //           {
  //             role: "bot",
  //             text: botResponse,
  //           },
  //         ]);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching bot response:", error);
  //       });
  //   };
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

        // Xóa tin nhắn "Bot is typing..."
        setChatHistory((prev) =>
          prev.filter((message) => message.text !== "Bot is typing...")
        );

        // Thêm phản hồi thực sự từ bot
        setChatHistory((prev) => [
          ...prev,
          {
            role: "bot",
            text: botResponse,
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
  return (
    <div className={classes.main}>
      <div className={classes.left}>
        <nav className={classes.nav}>
          <div className={classes.main1}>
            <span className={classes.span}>
              <Link to="/" style={{ textDecoration: "none" }}>
                {" "}
                {/* <img
                src={Imagee}
                alt="logo"
                style={{
                  width: "108px",
                  height: "70px",
                  aspectRatio: "auto 108/40",
                  overflowClipMargin: "content-box",
                  overflow: "clip",
                  cursor: "pointer",
                  verticalAlign: "middle",
                  borderRadius: "50%",
                }}
              /> */}
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
                            <ChatBoxAnimation/>
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
                                                {message.text}
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
                                        <div className={classes.main47}>
                                          <div className={classes.main48}>
                                            <div className={classes.main49}>
                                              <p className={classes.p}>
                                                {message.text}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
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
                        <button className={classes.button}>
                          <div className={classes.main17}>Find Job by Role</div>
                          <div className={classes.main18}>
                            Explore openings by job title
                          </div>
                        </button>
                        <button className={classes.button}>
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
