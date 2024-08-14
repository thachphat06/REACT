import { Link } from "react-router-dom";
function Download() {
	return (
		<section id="sidebar">
			<ul class="side-menu top">
				<li>
					<Link to={"/download"}>
						<i class='bx bxl-product-hunt' ></i>
						<span class="text">Download</span>
					</Link>
				</li>
				
			</ul>
		</section>
	)
}
export default Download;