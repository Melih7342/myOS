SECURITY_RESOURCES = {
    "arch": "https://wiki.archlinux.org/title/Security",
    "debian": "https://www.debian.org/doc/manuals/securing-debian-manual/",
    "ubuntu": "https://ubuntu.com/security/certifications/docs/usg",
    "fedora": "https://fedoraproject.org/wiki/Security_Features",
    "windows": "https://learn.microsoft.com/en-us/windows/security/",
    "red hat": "https://docs.redhat.com/de/documentation/red_hat_enterprise_linux/9/html-single/security_hardening/index",
    "opensuse": "https://en.opensuse.org/openSUSE:Security_Documentation",
    "manjaro": "https://wiki.manjaro.org/index.php/Linux_Security",
    "gentoo": "https://wiki.gentoo.org/wiki/Security_Handbook/Full",
    "cachyos": "https://wiki.cachyos.org/configuration/secure_boot_setup/",
    "linux mint": "https://www.youtube.com/watch?v=k47ins3URAs",
    "mx linux": "https://linuxsecurity.com/news/desktop-security/mx-linux-xfce-security-performance",
    "pop!_os": "https://www.fosslinux.com/111391/the-guide-to-enhancing-privacy-and-security-on-",
    "zorin os": "https://www.youtube.com/watch?v=zIVlsPxcUWk",
    "anduinos": "https://docs.anduinos.com/Servicing/Linux.html?h=security#setup-best-apt-mirror",
    "nixos": "https://github.com/decalage2/awesome-security-hardening"
}

def get_security_info(distro):
    name_raw = distro.get("name", "")
    name_lower = name_raw.lower()
    
    # If the OS is the main one in our list
    for key, link in SECURITY_RESOURCES.items():
        if key in name_lower:
            return {"url": link, "label": "Security Guide"}

    # Look at "based on" one by one
    based_on_raw = distro.get("based_on") or distro.get("Based on") or ""
    parents = [p.strip() for p in based_on_raw.split(",")]
    
    for parent in parents:
        parent_lower = parent.lower()
        for key, link in SECURITY_RESOURCES.items():
            if key in parent_lower:
                # CLEANUP: Remove anything in parentheses (e.g., "Debian (Stable)" -> "Debian")
                clean_name = parent.split('(')[0].strip()
                return {"url": link, "label": f"{clean_name} Security Guide"}

    return None