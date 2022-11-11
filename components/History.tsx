import {SWRResponse} from "swr";

type props = {
  value: SWRResponse<history, any>
}

const eventName = {
  "insert": "配信開始",
  "free": "無料配信開始",
  "endfree": "無料配信終了",
  "remove": "配信終了",
  "reenable": "配信再開",
  "incorrect genre": "ジャンル違いのため削除"
}

const History = ({value}:props) => {
  if (value.error)return <div className={"text-red-500"}>failed to load resources</div>;
  if (!value.data?.data)return <div className={"text-gray-500"}>読み込んでいます...</div>
  return <div>
    {value.data.data.map((val,index)=>{
      const date = new Date(val.addAt*1000).toLocaleString(),
        freeEndAt = val.freeEndAt===32503647600?"不明":new Date((val.freeEndAt||0)*1000).toLocaleString();
      return <p key={index}>[{date}]: {val.type==="anime"&&"タイトル"}{eventName[val.event]} {(val.freeEndAt!==null && val.freeEndAt >= 0)&&`無料配信期限: ${freeEndAt}`}</p>;
    })}
  </div>;
}
export {History};