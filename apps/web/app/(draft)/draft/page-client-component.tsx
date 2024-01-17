"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import { clientApi } from "../../_trpc/client-api";
import { useState } from "react";
import parse from 'html-react-parser';

type Inputs = {
    url: string
  }

export const PageClientComponent = () => {
    const [htmlUrl, setHtmlUrl] = useState<string>("")
    const [html, setHtml] = useState<string>("")

    const {  handleSubmit, register } = useForm<Inputs>();

    const {data} = clientApi.getHtml.useQuery({url: htmlUrl ?? ""});
    console.log(data)
   

    const { mutate } = clientApi.fetcher.useMutation({
        onSuccess: ({body, url}) => {
            console.log("success")
            setHtmlUrl(url)
            setHtml(body)
        }
    })

    const greeting1 = clientApi.greeting1.useQuery();
    console.log(greeting1.data)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log('data', data)
        mutate({url: data.url})
    }
    return (
        <>
            <div className="p-7 flex flex-col gap-4">
                <span className="text-[22px]">新規チェック依頼</span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("url", { required: true })} />
                    <button type="submit">チェック依頼</button>
                </form>
            </div>
            {htmlUrl  && (
                <iframe src={htmlUrl} className="w-[100%] h-[100%]"></iframe>
            )}
            {html && (
                <div className="w-[600px] h-[700px]">{parse(html)}</div>
            )}
        </>
    )
}