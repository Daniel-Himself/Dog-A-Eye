import os
import pkg_resources

def calc_container(path):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            total_size += os.path.getsize(fp)
    return total_size


if __name__ == '__main__':
    dists = [d for d in pkg_resources.working_set]
    packages = []
    for dist in dists:
        try:
            path = os.path.join(dist.location, dist.project_name)
            size = calc_container(path)
            if size/1000 > 1.0:
                packages += [(dist, size)]
                # print (f"{dist}: {size/1000} KB")
                # print("-"*40)
        except OSError:
            '{} no longer exists'.format(dist.project_name)
    packages.sort(key=lambda x: x[1], reverse=True)
    for package in packages:
        print (f"{package[0]}: {package[1]/1000} KB")
        print("-"*40)