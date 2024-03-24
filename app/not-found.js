import Link from "next/link";

export default function NotFound(){
    return(
        <div>
            <h1> Not Found - 404 </h1>
            <div>
                <Link href={'/'}>Go Back to Home</Link>
            </div>
        </div>
    )
}