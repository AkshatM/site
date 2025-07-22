import marimo

__generated_with = "0.14.12"
app = marimo.App(
    width="full",
    app_title="Akshat Mahajan | Distributed Systems",
    css_file="",
)


@app.cell
def _(mo):
    mo.hstack(
        [
            mo.md(f"[`me at akshatmahajan dot com`](mailto:me@akshatmahajan.com)"),
            mo.md("[`resume`](https://akshatmahajan.com/resume.pdf)"),
            mo.md(f"[`linkedin`](https://www.linkedin.com/in/mahajanakshat/)"),
            mo.md(f"[`github`](https://github.com/AkshatM)"),
        ],
        justify="space-between",
    )
    return


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
           - <span style='font-size: 1.5em'>I wrote and open-sourced a **Rust** library for it, and built all of Cloudflare's supporting infrastructure to support `Ed25519` real-time verification globally with it. 40K OSS downloads, over 72M served in first month.</span> 

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

    <span style='font-size: 1.5em'>Before all that, I was modeling paleoclimate mechanics as an undergrad research fellow with NASA.</span>

    <span style='font-size: 1.5em'>I studied Physics at UCLA and earned my Master’s in CS from Brown, but my learning has never stopped.</span>

    <span style='font-size: 1.5em'>Behind all the above is my own autodidactic drive. Outside of work, I'm a fledgling Mandarin speaker, and play classical guitar.</span>

    ---
    """
    )
    return


@app.cell
def _(mo):
    mo.hstack(
        [
            mo.stat(value="Rust"),
            mo.stat(value="Go"),
            mo.stat(value="Python"),
            mo.stat(value="Typescript"),
            mo.stat(value="eBPF"),
            mo.stat(value="SQL"),
        ],
        justify="center",
    )
    return


if __name__ == "__main__":
    app.run()
