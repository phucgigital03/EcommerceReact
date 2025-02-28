

function SetQuantity({
    quantity,
    cardCounter,
    handleQtyIncrease,
    handleQtyDecrease
}) {
    // console.log(quantity)

  return (
    <div className="flex gap-8 items-center">
        {cardCounter ? 
            null : 
            (<div className="font-semibold">
                QUANTITY
            </div>)
        }

        <div className="flex md:flex-row flex-col gap-4 items-center lg:text=[22px] text-sm">
            <button
                disabled={quantity<=1}
                onClick={handleQtyDecrease}
                className="border-[1.2px] border-slate-800 px-3 py-1 rounded"
            >
                -
            </button>
            <div className="text-red-500">{quantity}</div>
            <button
                onClick={handleQtyIncrease}
                className="border-[1.2px] border-slate-800 px-3 py-1 rounded"
            >
                +
            </button>
        </div>
    </div>
  )
}

export default SetQuantity

