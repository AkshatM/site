import marimo

__generated_with = "0.14.12"
app = marimo.App(
    width="full",
    app_title="Akshat Mahajan | Distributed Systems",
    css_file="",
    html_head_file="head.html",
)


@app.cell
def _():
    import marimo as mo

    return (mo,)


@app.cell
def _(mo):
    mo.md("<h1 style='font-size: 8em'>Hi, I'm Akshat</h1>").center()
    return


@app.cell(hide_code=True)
def _(mo):
    mo.md(
        """<h2 style='font-size: 2em'>I build bleeding-edge <b>distributed systems</b> at <a href="https://www.cloudflare.com">Cloudflare</a></h2>"""
    ).center()
    return


@app.cell(hide_code=True)
def _(mo):
    mo.md(
        r"""
    <span style='font-size: 3em'>I'm proud of shipping:</span>

    * <span style='font-size: 2em'>[**Web Bot Auth**](https://blog.cloudflare.com/verified-bots-with-cryptography/) — a public-key cryptography identity system for bots that replaces spoofable User Agents and cumbersome IP allow-lists. </span>
           - <span style='font-size: 1.5em'>I wrote the first-ever **Rust** library for this IETF RFC, and built the global infrastructure at Cloudflare around it, serving $> 50$ million requests and reaching $40,000$ open-source downloads in the first month.</span> 

    * <span style='font-size: 2em'> A blazing fast **10,000x** speedup in tail latency while working on [Argo Smart Routing](https://www.cloudflare.com/application-services/products/argo-smart-routing/), from $90$ milliseconds to $8$ microseconds.</span>
           - <span style='font-size: 1.5em'>I profiled bottlenecks in our asynchronous work queue serving 500,000 requests per second — then replaced the whole thing with an in-memory cache.</span>
    """
    ).callout()
    return


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""## <span style='font-size: 2em'>In six years, I've been the consummate generalist</span>""")
    return


@app.cell(hide_code=True)
def _(mo):
    mo.md(
        r"""
    <span style='font-size: 1.5em'>I’ve worn many hats. I've been</span>:

    - <span style='font-size: 1.5em'>an SRE at PlanGrid (YC '12), expanding traffic management to support multiple datacenters</span>

    - <span style='font-size: 1.5em'>a data engineer at BrightEdge, writing queuing systems to optimize bare-metal Hadoop pipelines</span>

    - <span style='font-size: 1.5em'>an NLP intern at DataWeave, wrangling Word2Vec as we sought to classify millions of short texts</span>

    <span style='font-size: 1.5em'>Before all that, I modelled paleoclimate dynamics as an undergrad research fellow with NASA.</span>

    <span style='font-size: 1.5em'>I studied Physics at UCLA and earned my Master’s in CS from Brown, but my learning has never stopped.</span>
    """
    )
    return


@app.cell
def _(mo):
    mo.accordion(
        {"##What tools are you familiar with?": """###I use *Rust*, *Go*, *Python*, *SQL* and *Typescript* on a regular basis. 

         ###I use *Terraform*, *Salt* and *Kubernetes* for all my infrastructure needs.

         ### I have esoteric knowledge of other things — eBPF, Pandas, and more!""",
        "##What do you do outside of work?": "###I'm a fledgling student of Mandarin, and I play classical guitar.",
         "##What do you look like?": mo.image(src="https://avatars.githubusercontent.com/u/6730980",rounded=True,alt="Akshat's face").center()}, multiple=True
    ).callout()
    return


@app.cell
def _(mo):
    mo.hstack(
        [
            mo.md(f"[`me@akshatmahajan.com`](mailto:me@akshatmahajan.com)"),
            mo.md("[`resume`](https://akshatmahajan.com/resume.pdf)"),
            mo.md(f"[`linkedin`](https://www.linkedin.com/in/mahajanakshat/)"),
            mo.md(f"[`github`](https://github.com/AkshatM)"),
        ],
        justify="space-between",
    )
    return


if __name__ == "__main__":
    app.run()
